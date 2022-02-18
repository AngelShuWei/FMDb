const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

function randomRating(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const seedReviews = num => {
    let i = 0;
    while (i < num) {
        const review = {
            content: faker.lorem.paragraph(),
            rating: randomRating(1, 5)
        }

        console.log(review, ',')
        i++;
    }
}

seedReviews(10)
