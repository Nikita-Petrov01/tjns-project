const ProductService = require('../services/ProductService');

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error({ error: error.message }, 'Ошибка при получении товаров');
      res.status(500).send('Ошибка сервера при получении товаров');
    }
  }

  static async getAllProductsByCategoryId(req, res) {
    try {
      const { id } = req.params;

      const products = await ProductService.getAllProductsByCategoryId(id);

      if (!products) {
        throw new Error('Товар не найден');
      }

      res.json(products);
    } catch (error) {
      console.error(
        { error: error.message },
        'Ошибка при получении товаров по категории',
      );
      res.status(500).send('Ошибка сервера при получении товаров по категории');
    }
  }

  static async createProduct(req, res) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.json(product);
    } catch (error) {
      console.error({ error: error.message }, 'Ошибка при создании товара');
      res.status(500).send('Ошибка сервера при создании товара');
    }
  }

  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.updateProduct(id, req.body);
      res.json(product);
    } catch (error) {
      console.error({ error: error.message }, 'Ошибка при обновлении товара');
      res.status(500).send('Ошибка сервера при обновлении товара');
    }
  }

  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.deleteProduct(id);
      res.json(product);
    } catch (error) {
      console.error({ error: error.message }, 'Ошибка при удалении товара');
      res.status(500).send('Ошибка сервера при удалении товара');
    }
  }

  static async getProductsById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductsById(id);
      res.json(product);
    } catch (error) {
      console.error({ error: error.message }, 'Ошибка при получении товара по id');
      res.status(500).send('Ошибка сервера при получении товара по id');
    }
  }
}

module.exports = ProductController;
