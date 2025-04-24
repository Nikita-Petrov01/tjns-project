const productRouter = require('express').Router()
const ProductController = require('../controllers/ProductController')

productRouter.get('/', ProductController.getAllProducts)
productRouter.get('/:id', ProductController.getAllProductsByCategoryId)
productRouter.get('/prod/:id', ProductController.getProductsById)
productRouter.post('/', ProductController.createProduct)
productRouter.put('/:id', ProductController.updatePost)
productRouter.delete('/:id', ProductController.deletePost)

module.exports = productRouter