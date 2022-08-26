const { Comment } = require('../models');

const commentdata = [
    {
        comment_text: 'Here lies a comment.',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: 'Twas a good comment.',
        user_id: 2,
        post_id: 2
    },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;