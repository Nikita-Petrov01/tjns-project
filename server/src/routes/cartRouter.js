const cartRouter = require('express').Router();
const CartController = require('../controllers/CartController');

cartRouter.get('/', CartController.getOrCreate);
cartRouter.delete('/', CartController.delete)

module.exports = cartRouter