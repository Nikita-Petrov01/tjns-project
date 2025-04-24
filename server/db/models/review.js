'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, User}) {
      this.belongsTo(Product, {foreignKey: 'productId'});
      this.belongsTo(User, {foreignKey: 'userId'});
    }
  }
  Review.init({
    rating: DataTypes.INTEGER,
    text: DataTypes.STRING, 
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};