'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Collections', [
      {
        name: 'Horror',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Comedy',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Action',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Horror',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Romance',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Action',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Romance',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Comedy',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'SciFi',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Comedy',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Horror',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sci-fi',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Romance',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Animated',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Singalong',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },


    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Collections', null, {});
  }
};
