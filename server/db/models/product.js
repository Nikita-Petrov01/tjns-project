'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ Category, Review, OrderItem, Favorite }) {
      this.hasMany(Review, { foreignKey: 'productId' });
      this.belongsTo(Category, { foreignKey: 'categoryId' });
      this.hasMany(OrderItem, { foreignKey: 'productId' });
      this.hasMany(Favorite, { foreignKey: 'productId' });
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
