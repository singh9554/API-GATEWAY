'use strict';
const {
  Model
} = require('sequelize');

const {ServerConfig} = require('../config')
const bcrypt = require('bcrypt');
const serverConfig = require('../config/server-config');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {through : 'User_Role', as : 'role'})
    }
  }
  User.init({
    email:{ 
       type : DataTypes.STRING,
       allowNull : false,
       unique: true,
       validate : {
        isEmail : true,
       }
    },
    password:{
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        len: [5, 15],
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(function  encrypt(user){
    const encryptPassword =  bcrypt.hashSync(user.password, +serverConfig.SALT_ROUNDS);
    user.password = encryptPassword;
  });
  return User;
};