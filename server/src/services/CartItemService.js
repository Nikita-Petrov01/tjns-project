const { Cart, CartItem, Product } = require('../../db/models');
const { Op } = require('sequelize');

class CartItemService {
  static async getItems(userId) {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return [];

    await CartItem.destroy({
      where: {
        cartId: cart.id,
        expiresAt: { [Op.lt]: new Date() },
      },
    });

    const cartItem = await CartItem.findAll({
      where: { cartId: cart.id },
      include: [Product],
    });
    return cartItem;
  }

  static async addItem({ userId, productId, quantity, price }) {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) throw new Error('Корзина не найдена');

    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Товар не найден');
    if (product.stock < quantity) throw new Error('Недостаточно товара в наличии');

    let cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });
    if (cartItem) {
      if (product.stock < cartItem.quantity + quantity) {
        throw new Error('Нельзя добавить больше товара, чем есть на складе');
      } 
      await cartItem.update({
      quantity: cartItem.quantity + quantity,
      expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    })
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        quantity,
        price,
        addedAt: new Date(),
        expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      });
    }

    await product.update({ stock: product.stock - quantity });

    return cartItem;
  }

  static async updateItem(itemId, quantity) {
    const item = await CartItem.findByPk(itemId);
    if (!item) throw new Error('Товар не найден');
    const updateItem = await item.update({ quantity });
    return updateItem;
  }

  static async deleteItem(itemId) {
    const deleted = await CartItem.destroy({ where: { id: itemId } });
    if (!deleted) throw new Error('Товар не найден');
    return deleted;
  }

  static async clearExpiredItems() {
    const now = new Date();
    const expiredItems = await CartItem.findAll({
      where: { expiresAt: { [Op.lt]: now } },
    })

    for (const item of expiredItems) {
      const product = await Product.findByPk(item.productId);

      if (product) {
        await product.update({ stock: product.stock + item.quantity });
      }
      await item.destroy();
    }
  }
}

module.exports = CartItemService;
