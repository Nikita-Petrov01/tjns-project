const categoryRouter = require('express').Router();
const CategoryController = require('../controllers/CategoryController');

categoryRouter.get('/', CategoryController.getAllCategories);
categoryRouter.post('/', CategoryController.createCategory);
categoryRouter.put('/:id', CategoryController.updatePost);
categoryRouter.delete('/:id', CategoryController.deletePost);   

module.exports = categoryRouter