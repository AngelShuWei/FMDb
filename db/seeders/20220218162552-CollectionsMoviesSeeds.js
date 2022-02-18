'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('CollectionMovies', [
      {
        movieId: 9,
        collectionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: 5,
        collectionId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: 19,
        collectionId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: 18,
        collectionId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: 1,
        collectionId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: 15,
        collectionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: 8,
        collectionId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: 9,
        collectionId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: 14,
        collectionId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: 20,
        collectionId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('CollectionMovies', null, {});
  }
};
