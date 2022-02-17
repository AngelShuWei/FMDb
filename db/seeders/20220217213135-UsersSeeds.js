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
        email: 'jd@fmdb-project.com'
      },
      {
        username: 'AngelWei',
        hashedPassword: 'Password1!',
        email: 'aw@fmdb-project.com'
      },
      {
        username: 'CeciliaZhao',
        hashedPassword: 'Password1!',
        email: 'cz@fmdb-project.com'
      },
      {
        username: 'LeahKim',
        hashedPassword: 'Password1!',
        email: 'lk@fmdb-project.com'
      },
      {
        username: 'PaulOh',
        hashedPassword: 'Password1!',
        email: 'po@fmdb-project.com'
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
