const cartRouter = require('express').Router();
const CartController = require('../controllers/CartController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

cartRouter.get('/', verifyAccessToken, CartController.getOrCreate);
cartRouter.delete('/', CartController.delete)

module.exports = cartRouter