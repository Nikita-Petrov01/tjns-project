const { Cart } = require('../../db/models');

class CartService {
  static async getOrCreateCart(userId) {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }
    return cart;
  }

  static async deleteCart(userId) {
    const cart = await Cart.destroy({ where: { userId } });
    return cart
  }
}

module.exports = CartService;