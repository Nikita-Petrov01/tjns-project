'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      this.belongsTo(Product, { foreignKey: 'productId' });
    }
  }
  CartItem.init({
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    addedAt: DataTypes.DATE,
    expiresAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};