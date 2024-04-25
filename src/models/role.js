'use strict';
const {
  Model
} = require('sequelize');

const {Enum} = require('../utils/common')
const {Admin,Customer,Flight_Company} = Enum.USER_ROLES_ENUM;
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {through: 'User_Role', as : 'user'})
    }
  }
  Role.init({
    name:{
      type :  DataTypes.ENUM({
        values: [Admin, Customer,Flight_Company]
      }),
      allowNull: false,
      defaultValue : Customer,
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};