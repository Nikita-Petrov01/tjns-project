const favoriteRouter = require('express').Router();
const FavoriteController = require('../controllers/FavoriteController');

favoriteRouter
    .route('/')
    .delete(FavoriteController.deleteFavorite)
    .post(FavoriteController.addFavorite);

favoriteRouter
    .route('/:userId')
    .get(FavoriteController.getAllFavoritesByUserId);

module.exports = favoriteRouter;