const cartItemRouter = require('express').Router();
const CartItemController = require('../controllers/CartItemController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

cartItemRouter.get('/', verifyAccessToken, CartItemController.getAll);
cartItemRouter.post('/', verifyAccessToken, CartItemController.add);
cartItemRouter.put('/:itemId', CartItemController.update);
cartItemRouter.delete('/:itemId', verifyAccessToken, CartItemController.delete);
cartItemRouter.post('/validate', verifyAccessToken, CartItemController.validate);

module.exports = cartItemRouter;