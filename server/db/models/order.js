'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User, {foreignKey: 'userId'});
    }
  }
  Order.init({
    status: DataTypes.ENUM('pending', 'processing', 'delivered', 'cancelled'),
    totalPrice: DataTypes.INTEGER,
    guestEmail: DataTypes.STRING,
    guestPhone: DataTypes.STRING,
    guestName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};