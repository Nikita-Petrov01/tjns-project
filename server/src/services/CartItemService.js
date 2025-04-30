const { Cart, CartItem, Product } = require('../../db/models');

class CartItemService {
  static async getItems(userId) {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return [];
    
    const cartItem = await CartItem.findAll({
      where: { cartId: cart.id },
      include: [{model: Product}],
    });

    const result = cartItem.map((item) => {
      const plain = item.toJSON();

      return {
        ...plain,
        product: plain.Product,
      }
    })
    
    return result;
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

  static async validateCartItems(userId, cartItems) {
    const errors = [];
    const updatedItems = [];

    for (const cartItem of cartItems) {
      const product = await Product.findByPk(cartItem.productId);

      if (!product) {
        errors.push({
          productId: cartItem.productId,
          message: 'Товар не найден',
        })
        continue;
      }

      updatedItems.push({
        productId: product.id,
        availableStock: product.stock,
      });
    }
    return {errors, updatedItems};
  }
}

module.exports = CartItemService;
