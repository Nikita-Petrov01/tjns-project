const cartRouter = require('express').Router();
const CartController = require('../controllers/CartController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

cartRouter.get('/', verifyAccessToken, CartController.getOrCreate);
cartRouter.delete('/', CartController.delete)

cartRouter.post('/with-items', verifyAccessToken, CartController.createCartWithItems);

module.exports = cartRouter