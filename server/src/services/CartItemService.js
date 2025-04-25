const { Cart, CartItem, Product } = require('../../db/models');

class CartItemService {
  static async getItems(userId) {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return [];

    const cartItem = await CartItem.findAll({
      where: { cartId: cart.id },
      include: [Product],
    });
    return cartItem
  }

  static async addItem({ userId, productId, quantity, price }) {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) throw new Error('Корзина не найдена');

    const cartItem = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity,
      price,
    });
    return cartItem
  }

  static async updateItem(itemId, quantity) {
    const item = await CartItem.findByPk(itemId);
    if (!item) throw new Error('Товар не найден');
    const updateItem = await item.update({ quantity });
    return updateItem
  }

  static async deleteItem(itemId) {
    const deleted = await CartItem.destroy({ where: { id: itemId } });
    if (!deleted) throw new Error('Товар не найден');
    return deleted;
  }
}

module.exports = CartItemService;
