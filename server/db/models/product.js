'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ Category, Review }) {
      this.hasMany(Review, { foreignKey: 'productId' });
      this.belongsTo(Category, { foreignKey: 'categoryId' });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      images: DataTypes.ARRAY(DataTypes.TEXT),
      price: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
