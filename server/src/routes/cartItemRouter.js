const cartItemRouter = require('express').Router();
const CartItemController = require('../controllers/CartItemController');

cartItemRouter.get('/', CartItemController.getAll);
cartItemRouter.post('/', CartItemController.add);
cartItemRouter.put('/:itemId', CartItemController.update);
cartItemRouter.delete('/:itemId', CartItemController.delete);

module.exports = cartItemRouter;