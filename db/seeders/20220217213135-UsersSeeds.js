'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', [
      {
        username: 'JohnDoe',
        hashedPassword: 'Password1!',
        email: 'jd@fmdb-project.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'AngelWei',
        hashedPassword: 'Password1!',
        email: 'aw@fmdb-project.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'CeciliaZhao',
        hashedPassword: 'Password1!',
        email: 'cz@fmdb-project.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'LeahKim',
        hashedPassword: 'Password1!',
        email: 'lk@fmdb-project.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'PaulOh',
        hashedPassword: 'Password1!',
        email: 'po@fmdb-project.com',
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
    return queryInterface.bulkDelete('Users', null, {});
  }
};
