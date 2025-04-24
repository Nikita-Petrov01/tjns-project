'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Review, Order }) {
      this.hasMany(Review, { foreignKey: 'userId' });
      this.hasMany(Order, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      number: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
