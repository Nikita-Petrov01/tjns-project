const { Cart, CartItem, Product } = require('../../db/models');

class CartService {
  static async getOrCreateCart(userId) {
    console.log('юзерррррррррр', userId)
  let cart = await Cart.findOne({ 
    where: { userId }, 
    include: [{
      model: CartItem,
      include: [Product]
    }]
  });
  console.log('cart111111111111111111111111111111111111111111111', cart);

  if (!cart) {
    cart = await Cart.create({ userId });
    cart.cartItems = [];
  }
  console.log('cart22222222222222222222222222222222222222222222222222', cart);
  return cart;
  }

  static async createCartWithItems(userId, items) {
    const cart = await this.getOrCreateCart(userId);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    for (const item of items) {
      // eslint-disable-next-line no-await-in-loop
      const product = await Product.findByPk(item.productId);
      if (!product) throw new Error(`Товар с id ${item.productId} не найден`);
      if (product.stock < item.quantity) throw new Error('Недостаточно товара на складе');

      // eslint-disable-next-line no-await-in-loop
      await CartItem.create({
        cartId: cart.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        addedAt: now,
        expiresAt,
      });
    }
    return { message: 'Корзина создана с товарами' };
  }


  static async deleteCart(userId) {
    const cart = await Cart.destroy({ where: { userId } });
    return cart
  }
}

module.exports = CartService;