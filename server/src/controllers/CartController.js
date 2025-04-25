const CartService = require('../services/CartService');

class CartController {
    static async getOrCreate(req, res) {
      try {
        const cart = await CartService.getOrCreateCart(req.user.id);
        res.json(cart);
      } catch (e) {
        console.error('Ошибка при создании или получении корзины', e)
        res.status(500).send('Ошибка сервера при создании или получении корзины');
      }
    }
  
    static async delete(req, res) {
      try {
        await CartService.deleteCart(req.user.id);
        res.sendStatus(204)
      } catch (e) {
        console.error('Ошибка при удалении корзины', e)
        res.status(500).send('Ошибка сервера при удалении корзины');
      }
    }
  }
  
  module.exports = CartController;