const { Blog } = require('../models');

const blogdata = [
    {
        blog_id: 1,
        title: 'Why MVC is so important',
        description: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
        author_name: 'Xandromus',
        post_date: '5/8/2020',
    },
    {
        blog_id: 2,
        title: 'Authentication vs. Authorization',
        description: 'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authroization means being allowed access to the system.',
        author_name: 'Xandromus',
        post_date: '8/14/2021',
    },
    {
        blog_id: 3,
        title: 'Object-Relationsal Mapping',
        description: 'I have really loved learning about ORMs. It has really simplified the way I create queries in SQL!',
        author_name: 'Lernantino',
        post_date: '11/26/2020',
    },
];

const seedBlog = () => Blog.bulkCreate(blogdata);

module.exports = seedBlog;