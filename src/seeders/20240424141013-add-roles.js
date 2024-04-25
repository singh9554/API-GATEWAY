'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Roles', [
       {
         name: 'admin',
         CreatedAt : new Date(),
         UpdatedAt : new Date(),
       },
       {
        name : 'customer',
        CreatedAt : new Date(),
        UpdatedAt : new Date(),
       },
       {
        name : 'flight_company',
        CreatedAt : new Date(),
        UpdatedAt : new Date(),
       }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
