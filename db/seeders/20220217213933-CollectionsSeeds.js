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
        userId: 1
      },
      {
        name: 'Comedy',
        userId: 1
      },
      {
        name: 'Action',
        userId: 1
      },
      {
        name: 'Horror',
        userId: 2
      },
      {
        name: 'Romance',
        userId: 2
      },
      {
        name: 'Action',
        userId: 2
      },
      {
        name: 'Romance',
        userId: 3
      },
      {
        name: 'Comedy',
        userId: 3
      },
      {
        name: 'SciFi',
        userId: 3
      },
      {
        name: 'Comedy',
        userId: 4
      },
      {
        name: 'Horror',
        userId: 4
      },
      {
        name: 'Sci-fi',
        userId: 4
      },
      {
        name: 'Romance',
        userId: 5
      },
      {
        name: 'Animated',
        userId: 5
      },
      {
        name: 'Singalong',
        userId: 5
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
