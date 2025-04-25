const { Category, Product } = require('../../db/models');

class CategoryService {
  static async getAllCategories() {
    const categories = await Category.findAll();
    return categories;
  }

  static async getOneCategory(id) {
    const category = await Category.findByPk(id);
    return category;
  }

  static async createCategory({ name }) {
    if (!name) {
      throw new Error('Не хватает данных для создания категории');
    }
    const category = await Category.create({ name });
    return category;
  }

  static async updateCategory(id, { name }) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error('Категория не найдена');
    }

    if (!name) {
      throw new Error('Не хватает данных для обновления категории');
    }

    await category.update({ name });
    return category;
  }

  static async deleteCategory(id) {
    const deleteCategory = await Category.destroy({ where: { id } });

    if (deleteCategory === 0) {
      throw new Error('Категория не найдена');
    }

    return deleteCategory;
  }

  static async getProductsByCategory(categoryId) {
    const products = await Product.findAll({
      where: { categoryId },
    });
    return products;
  }
}

module.exports = CategoryService;
