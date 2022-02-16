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

Demo User Credentials-------------
username: demo_user
email: demo_user@fmbdDemo.com
password: Password555!


Collections Model--------------
npx sequelize model:generate --name Collection --attributes name:string
