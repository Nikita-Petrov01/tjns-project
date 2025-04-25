const {Favorite} = require('../../db/models');

class FavoriteService {
    static async addFavorite({userId, productId}) {
        const favorite = await Favorite.create({userId, productId});
        return favorite;
    }

    static async deleteFavorite({userId, productId}) {

        const favorite = await Favorite.destroy({where: {userId, productId}});
        return favorite;
    }

    static async getAllFavoritesByUserId(userId) {
        const favorites = await Favorite.findAll({where: {userId}});
        return favorites;
    }
}

module.exports = FavoriteService;