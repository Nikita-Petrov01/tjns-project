const CategoryService = require('../services/CategoryService')

class CategoryController {

    static async getAllCategories(req, res) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.json(categories)
        } catch (error) {
            console.error({error: error.message}, 'Ошибка при получении категорий');
            res.status(500).send('Ошибка сервера при получении категорий');
        }
    }

    static async createCategory(req, res) {
        try {
            const category = await CategoryService.createCategory(req.body);
            res.json(category)
        } catch (error) {
            console.error({error: error.message}, 'Ошибка при создании категории');
            res.status(500).send('Ошибка сервера при создании категории');
        }
    }

    static async updatePost(req, res) {
        try {
            const {id} = req.params
            const category = await CategoryService.updateCategory(id, req.body);
            res.json(category)
        } catch (error) {
            console.error({error: error.message}, 'Ошибка при обновлении категории');
            res.status(500).send('Ошибка сервера при обновлении категории');
        }
    }

    static async deletePost(req, res) {
        try {
            const {id} = req.params
            const category = await CategoryService.updateCategory(id);
            res.json(category)
        } catch (error) {
            console.error({error: error.message}, 'Ошибка при удалении категории');
            res.status(500).send('Ошибка сервера при удалении категории');
        }
    }   
}

module.exports = CategoryController;