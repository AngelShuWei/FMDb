'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Reviews', [
      {
        content: 'Nemo repellendus beatae laboriosam fuga at. Eveniet natus dignissimos quae. Veritatis facere id vel iusto sed nobis quisquam.',
        rating: 4,
        userId: 1,
        movieId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Vel pariatur veritatis quasi sunt sit facere id. Suscipit unde quo. Id enim veniam praesentium nostrum est quis.',
        rating: 1,
        userId: 1,
        movieId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Et ipsam ut fugit et nulla. Adipisci beatae sed mollitia commodi laudantium libero. Inventore autem minima praesentium qui dolores autem sint laboriosam. Aut qui et fuga assumenda.',
        rating: 4,
        userId: 2,
        movieId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Et qui velit sapiente voluptas laudantium pariatur voluptates. Aliquid repellat ut sit eum aut. Sit alias tempora.',
        rating: 1,
        userId: 2,
        movieId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Natus eaque tempora nulla voluptas accusamus amet illo facere. Eum quisquam cum odio. In laboriosam sint omnis magnam maxime odio reprehenderit non in. Sapiente perspiciatis dolor. Nostrum qui cumque eum sequi aut dolorem.',
        rating: 4,
        userId: 3,
        movieId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Provident non ex. Ducimus excepturi quis aut. At et et id non iusto nemo dolore ea minima. Impedit est vel hic voluptas incidunt. Ducimus sapiente aliquam delectus eum fugit accusamus.',
        rating: 2,
        userId: 3,
        movieId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Nesciunt eum repellendus officia reiciendis dignissimos optio quo aut et. Quo excepturi veniam placeat iusto sunt. Vitae aut ut odio laudantium sunt iste commodi qui. Debitis maiores harum quo libero suscipit.',
        rating: 2,
        userId: 4,
        movieId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Porro modi quos soluta eius. Eius veritatis assumenda impedit porro recusandae est ad. Et delectus id ut blanditiis nihil est eligendi ipsam. Ipsa debitis rerum officia.',
        rating: 1,
        userId: 4,
        movieId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Cum repellendus perferendis suscipit et rem in dicta exercitationem. Tenetur sit quis quisquam eveniet ratione consequatur. Nihil pariatur ut omnis ipsa veniam qui. Voluptas similique laborum harum nulla repellendus animi et ratione. Deserunt soluta quasi eligendi consequatur. Suscipit qui ducimus incidunt.',
        rating: 3,
        userId: 5,
        movieId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Sit rerum est qui. Eos iure cumque quam delectus qui quia iste. Accusantium itaque inventore deleniti repudiandae fuga nemo omnis a asperiores. Cupiditate ut ipsa tempora nihil quasi voluptatem omnis. Aut reprehenderit laboriosam.',
        rating: 2,
        userId: 5,
        movieId: 6,
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
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
