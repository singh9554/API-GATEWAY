'use strict';
/** @type {import('sequelize-cli').Migration} */
const {Enum} = require('../utils/common')
const {Admin,Customer,Flight_Company} = Enum.USER_ROLES_ENUM;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.ENUM,
        values: [Admin, Customer,Flight_Company],
        allowNull: false,
        defaultValue: Customer
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};