const { User } = require('../models');

const userdata = [
    {
        username: 'Xandromus',
        password: 'ThePenIsMightier'
    },
    {
        username: 'Lernantino',
        password: 'StopwithPenIsJokes'
    },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;