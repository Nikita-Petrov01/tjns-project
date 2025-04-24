const authRouter = require('express').Router()
const AuthController = require('../controllers/AuthController');

authRouter.post('/signup', AuthController.signup);
authRouter.post('/login', AuthController.login);
authRouter.get('/logout', AuthController.logout);

module.exports = authRouter