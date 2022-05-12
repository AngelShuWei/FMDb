# FMDb

<img width="1023" alt="image" src="https://github.com/cc-y-zhao/renttheroadshow/blob/main/frontend/public/images/fmdb_homepage.png?raw=true">

[FMDb](https://fmdb-group-project.herokuapp.com/), inspired by [IMDb](https://www.imdb.com/?ref_=nv_home), is an online movie database where users can explore movies, create collections, and leave ratings and reviews.

## Meet the developer behind Book-In-Style~

FMDb is brought to you by the following developers: 
<br>
[Leah Kim](https://www.linkedin.com/search/results/all/?keywords=leah%20kim&origin=RICH_QUERY_SUGGESTION&position=0&searchId=ea124782-355e-43d9-9ee1-7f421129ed7a&sid=unI)
<br>
[Paul Oh](https://www.linkedin.com/in/paul-oh-82824117a/)
<br>
[Angel Wei](https://www.linkedin.com/in/angel-wei-21952b16a/)
<br>
[Cecilia Zhao](https://www.linkedin.com/in/ceciliazh/)

Thank you for visiting!

---

# Index


### Navigating this ReadMe

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Features](#features)

<br>

# Technologies Used

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript" width="60" /><img src="https://assets.website-files.com/61ca3f775a79ec5f87fcf937/6202fcdee5ee8636a145a41b_1234.png" alt="postgresql" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" alt="html5" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" alt="css3" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="git" width="60" />
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Rr7K5gOm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dbalas.gallerycdn.vsassets.io/extensions/dbalas/vscode-html2pug/0.0.2/1532242577062/Microsoft.VisualStudio.Services.Icons.Default" alt="git" width="60" />

<br>

# Getting Started

<details>
<summary>How do I run this project?</summary>

1. Clone this repo
    * `git clone git@github.com:AngelShuWei/FMDb.git`

2. Install dependencies 
    * `npm install`

3. Create a user with CREATEDB and PASSWORD in PSQL
    * `CREATE USER <name> WITH CREATEDB PASSWORD '<password>'`

4. Create a `.env` file in the backend directory based on the `.env.example` found within the respective directory

5. Enter your psql user's name and password information into your `.env` file along with your desired database name, a secured combination of characters for your JWT_SECRET, and your desired PORT (preferably 5000)

6. Create Database, Migrate, and Seed models:
    * `npx dotenv sequelize db:create`
    * `npx dotenv sequelize db:migrate`
    * `npx dotenv sequelize db:seed:all`

7. Start the application 
    * `npm start`

</details>

<details>
<summary>How do I log in as a Demo User?</summary>
On the log in page, click "Demo Login".
   
   
</details>

<br>

# Features

## Collections
<img width="700" height="350" alt="collections" src="https://github.com/cc-y-zhao/Book-In-Style/blob/misc_v5/react-app/public/images/collections.png?raw=true">

Users can create, edit, and delete movie collections.
   
## Reviews
<img src="https://github.com/cc-y-zhao/Book-In-Style/blob/misc_v5/react-app/public/images/reviews.png?raw=true" width="480" height="950" />

Users can create, update, and delete ratings and reviews.

<br>
