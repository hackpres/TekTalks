const { Author } = require('../models');

const authordata = [
    {
        author_id: 1,
        name: 'Xandromus',
    },
    {
        author_id: 2,
        name: 'Lernantino',
    },
];

const seedAuthor = () => Author.bulkCreate(authordata);

module.exports = seedAuthor;