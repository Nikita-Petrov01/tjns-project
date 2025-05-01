const { Cart, CartItem, Product } = require('../../db/models');

class CartItemService {
  static async getItems(userId) {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return [];

    const cartItem = await CartItem.findAll({
      where: { cartId: cart.id },
      include: [{ model: Product }],
    });

    const result = cartItem.map((item) => {
      const plain = item.toJSON();

      return {
        ...plain,
        product: plain.Product,
      };
    });

    return result;
  }

  static async addItem({ userId, productId, price }) {
    if ( !userId || !productId || !price) {
      throw new Error('Недостаточно данных для добавления товара в корзину');
    } 
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) throw new Error('Корзина не найдена');

    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Товар не найден');

    const existingItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId,
      },
    });
    
    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      const result = await CartItem.findByPk(existingItem.id, { include: [Product] });
      return result;
    }

    const cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        quantity: 1,
        price,
      });
    return cartItem;
  }

  static async updateItem(itemId, quantity) {
    if (!itemId || !quantity) {
      throw new Error('Недостаточно данных для обновления товара в корзине');
    }

    const item = await CartItem.findByPk(itemId);
    if (!item) throw new Error('Товар не найден');

    const product = await Product.findByPk(item.productId);
    if (!product) throw new Error('Товар не найден');

    if (quantity > product.stock) {
      throw new Error(`На складе только ${product.stock} шт.`);
    }

    if (quantity === 0) {
      throw new Error('Товар законничился');
    }
    
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
        });
        continue;
      }

      // update user cartItem!
      const actualQuantity = Math.min(cartItem.quantity, product.stock);

    if (cartItem.quantity > product.stock) {
      // Обновляем корзину, если количество превышает остаток
      await CartItemService.updateItem(cartItem.id, actualQuantity);
    }

    updatedItems.push({
      productId: product.id,
      availableStock: actualQuantity,
    });
    }
    return { errors, updatedItems };
  }
}

module.exports = CartItemService;
