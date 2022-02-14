psql -W -U clap fmdb

psql-------------------------
CREATE USER clap WITH PASSWORD 'password' CREATEDB;

npx dotenv sequelize db:create

User Model------------------
npx sequelize model:generate --name User --attributes username:string,hashedPassword:string,email:string

npx dotenv sequelize db:migrate
