const { Author } = require('../models');

const authordata = [
    {
        user_id: 1,
        author_name: 'Xandromus',
    },
    {
        user_id: 2,
        author_name: 'Lernantino',
    },
];

const seedAuthor = () => Author.bulkCreate(authordata);

module.exports = seedAuthor;