const sequelize = require('../config/connection');
const seedBlog = require('./blogData');
const seedAuthor = require('./authorData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBlog();

  await seedAuthor();

  process.exit(0);
};

seedAll();
