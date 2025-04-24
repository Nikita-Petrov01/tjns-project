'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Order.init(
    {
      status: DataTypes.ENUM('pending', 'processing', 'delivered', 'cancelled'),
      totalPrice: DataTypes.INTEGER,
      guestEmail: DataTypes.STRING,
      guestPhone: DataTypes.STRING,
      guestName: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
