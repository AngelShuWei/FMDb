'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Movies',
      [
        {
          name: "Spider-Man: No Way Home",
          description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
          director: "Jon Watts",
          releaseYear: 2021,
          imageURL: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "The Matrix",
          description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
          director: "Lana Wachowski, Lilly Wachowski",
          releaseYear: 1999,
          imageURL: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Resident Evil: Welcome to Raccoon City",
          description: "Set in 1998, this origin story explores the secrets of the mysterious Spencer Mansion and the ill-fated Raccoon City.",
          director: "Johannes Roberts",
          releaseYear: 2021,
          imageURL: "https://m.media-amazon.com/images/M/MV5BNjRmMDUxODctYjg3NC00NDRhLWJhZWItMjg0OTZkMDBjNWUxXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Shang-Chi and the Legend of the Ten Rings",
          description: "Shang-Chi, the master of weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
          director: "Destin Daniel Cretton",
          releaseYear: 2021,
          imageURL: "https://m.media-amazon.com/images/M/MV5BNTliYjlkNDQtMjFlNS00NjgzLWFmMWEtYmM2Mzc2Zjg3ZjEyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Avengers: Endgame",
          description: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
          director: "Anthony Russo, Joe Russo",
          releaseYear: 2019,
          imageURL: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Your Name",
          description: "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
          director: "Makoto Shinkai",
          releaseYear: 2016,
          imageURL: "https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Titanic",
          description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
          director: "James Cameron",
          releaseYear: 1997,
          imageURL: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "A Silent Voice",
          description: "A young man is ostracized by his classmates after he bullies a deaf girl to the point where she moves away. Years later, he sets off on a path for redemption.",
          director: "Naoko Yamada",
          releaseYear: 2016,
          imageURL: "https://m.media-amazon.com/images/M/MV5BZGRkOGMxYTUtZTBhYS00NzI3LWEzMDQtOWRhMmNjNjJjMzM4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "The Notebook",
          description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
          director: "Nick Cassavetes",
          releaseYear: 2004,
          imageURL: "https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "The Vow",
          description: "A car accident puts Paige in a coma, and when she wakes up with severe memory loss, her husband Leo works to win her heart again.",
          director: "Michael Sucsy",
          releaseYear: 2012,
          imageURL: "https://m.media-amazon.com/images/M/MV5BMjE1OTU5MjU0N15BMl5BanBnXkFtZTcwMzI3OTU5Ng@@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "It",
          description: "In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town.",
          director: "Andy Muschietti",
          releaseYear: 2017,
          imageURL: "https://m.media-amazon.com/images/M/MV5BZDVkZmI0YzAtNzdjYi00ZjhhLWE1ODEtMWMzMWMzNDA0NmQ4XkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Parasite",
          description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
          director: "Bong Joon Ho",
          releaseYear: 2019,
          imageURL: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "The Shining",
          description: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
          director: "Stanley Kubrick",
          releaseYear: 1980,
          imageURL: "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "The Conjuring",
          description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
          director: "James Wan",
          releaseYear: 2013,
          imageURL: "https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Get Out",
          description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
          director: "Jordan Peele",
          releaseYear: 2017,
          imageURL: "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "White Chicks",
          description: "Two disgraced FBI agents go way undercover in an effort to protect hotel heiresses the Wilson sisters from a kidnapping plot.",
          director: "Keenen Ivory Wayans",
          releaseYear: 2004,
          imageURL: "https://m.media-amazon.com/images/M/MV5BMTY3OTg2OTM3OV5BMl5BanBnXkFtZTYwNzY5OTA3._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Wedding Crashers",
          description: "John Beckwith and Jeremy Grey, a pair of committed womanizers who sneak into weddings to take advantage of the romantic tinge in the air, find themselves at odds with one another when John meets and falls for Claire Cleary.",
          director: "David Dobkin",
          releaseYear: 2005,
          imageURL: "https://m.media-amazon.com/images/M/MV5BZmJkNzViYjYtZWZlNy00OGE4LWI2MzUtYTcwNjY3Y2MyODIwXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Ace Ventura: Pet Detective",
          description: "A goofy detective specializing in animals goes in search of the missing mascot of the Miami Dolphins.",
          director: "Tom Shadyac",
          releaseYear: 1994,
          imageURL: "https://m.media-amazon.com/images/M/MV5BYmVhNmFmOGYtZjgwNi00ZGQ0LThiMmQtOGZjMDUzNzJhMGIzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Napoleon Dynamite",
          description: "A listless and alienated teenager decides to help his new friend win the class presidency in their small western high school, while he must deal with his bizarre family life back home.",
          director: "Jared Hess",
          releaseYear: 2004,
          imageURL: "https://m.media-amazon.com/images/M/MV5BNjYwNTA3MDIyMl5BMl5BanBnXkFtZTYwMjIxNjA3._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Clueless",
          description: "Shallow, rich and socially successful Cher is at the top of her Beverly Hills high school's pecking scale. Seeing herself as a matchmaker, Cher first coaxes two teachers into dating each other.",
          director: "Amy Heckerling",
          releaseYear: 1995,
          imageURL: "https://m.media-amazon.com/images/M/MV5BMzBmOGQ0NWItOTZjZC00ZDAxLTgyOTEtODJiYWQ2YWNiYWVjXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Movies', null, {});
  }
};
