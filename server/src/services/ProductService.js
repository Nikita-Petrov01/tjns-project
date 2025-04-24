const { Product } = require('../../db/models');

class ProductService {
  static async getAllProducts() {
    const products = await Product.findAll();
    return products;
  }

  static async getProductsById(id) {
    const product = await Product.findByPk(id);
    return product;
  }

  static async getAllProductsByCategoryId(id) {
    const products = await Product.findAll({ where: { categoryId: id } });
    return products;
  }

  static async createProduct({ name, description, images, price, categoryId }) {
    if (!name || !description || !images || !price || !categoryId) {
      throw new Error('Не хватает данных для создания товара');
    }
    const product = await Product.create({
      name,
      description,
      images,
      price,
      categoryId,
    });
    return product;
  }

  static async updateProduct(id, { name, description, images, price, categoryId }) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Товар не найден');
    }

    if (!name || !description || !images || !price || !categoryId) {
      throw new Error('Не хватает данных для обновления товара');
    }

    await product.update({ name, description, images, price, categoryId });
    return product;
  }

  static async deleteProduct(id) {
    const deleteProduct = await Product.destroy({ where: { id } });

    if (deleteProduct === 0) {
      throw new Error('Товар не найдена');
    }

    return deleteProduct;
  }
}

module.exports = ProductService;
