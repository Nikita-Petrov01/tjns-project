const CartItemService = require('../services/CartItemService');

class CartItemController {
    
  static async getAll(req, res) {
    try {
      const items = await CartItemService.getItems(req.user.id);
      res.json(items);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async add(req, res) {
    try {
      const item = await CartItemService.addItem({
        userId: req.user.id,
        ...req.body,
      });
      res.status(201).json(item);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async update(req, res) {
    try {
      const item = await CartItemService.updateItem(req.params.itemId, req.body.quantity);
      res.json(item);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async delete(req, res) {
    try {
      await CartItemService.deleteItem(req.params.itemId);
      res.status(204).send();
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}

module.exports = CartItemController;
