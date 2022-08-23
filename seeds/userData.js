const { User } = require('../models');

const userdata = [
    {
        user_id: 1,
        username: 'Xandromus',
        password: 'ThePenIsMightier'
    },
    {
        user_id: 2,
        username: 'Lernantino',
        password: 'StopwithPenIsJokes'
    },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;