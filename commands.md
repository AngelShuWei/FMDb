psql -W -U clap fmdb

psql-------------------------
CREATE USER clap WITH PASSWORD 'password' CREATEDB;

npx dotenv sequelize db:create

User Model------------------
npx sequelize model:generate --name User --attributes username:string,hashedPassword:string,email:string

npx dotenv sequelize db:migrate

Movie Model------------------
npx sequelize model:generate --name Movie --attributes name:string,description:text,director:string,releaseYear:integer,imageURL:string

npx dotenv sequelize db:migrate
npx dotenv sequelize db:migrate:undo:all


npx sequelize seed:generate --name MoviesSeeds

npx dotenv sequelize db:seed:all

To drop and create db -----------
npx dotenv sequelize db:drop
npx dotenv sequelize db:create


Demo User Credentials-------------
username: demo_user
email: demo_user@fmbdDemo.com
password: Password555!


Collections Model--------------
npx sequelize model:generate --name Collection --attributes name:string,userId:integer

CollectionMovies Model-----------
npx sequelize model:generate --name CollectionMovie --attributes movieId:integer,collectionId:integer

Reviews Model--------------
npx sequelize model:generate --name Review --attributes content:text,rating:integer,userId:integer,movieId:integer


User Seeder--------------
npx sequelize seed:generate --name UsersSeeds
-------------------------------------------------
username: 'John_Doe',
hashedPassword: 'Password1!',
email: 'jd@fmdb-project.com'
-------------------------------------------------

Collection Seeder-------------
npx sequelize seed:generate --name CollectionsSeeds
-------------------------------------------------



-------------------------------------------------
Review Seeder---------------
npx sequelize seed:generate --name ReviewsSeeds
