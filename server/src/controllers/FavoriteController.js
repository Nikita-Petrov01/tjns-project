const FavoriteService = require('../services/FavoriteService');

class FavoriteController {
    static async addFavorite(req, res) {
        try {
            const favorite = await FavoriteService.addFavorite(req.body);
            res.status(201).json(favorite);
        } catch (error) {
            console.error('Ошибка при добавлении в избранное', error);
            res.status(500).send('Ошибка сервера при добавлении в избранное');
        }
    }

    static async deleteFavorite(req, res) {
        try {
            const favorite = await FavoriteService.deleteFavorite(req.body);
            res.json(favorite);
        } catch (error) {
            console.error('Ошибка при удалении из избранного', error);
            res.status(500).send('Ошибка сервера при удалении из избранного');
        }
    }

    static async getAllFavoritesByUserId(req, res) {
        try {
            const favorites = await FavoriteService.getAllFavoritesByUserId(req.params.userId);
            res.json(favorites);
        } catch (error) {
            console.error('Ошибка при получении избранных товаров', error);
            res.status(500).send('Ошибка сервера при получении избранных товаров');
        }
    }
}   

module.exports = FavoriteController;