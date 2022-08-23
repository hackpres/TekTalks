const User = require('./User');
const Author = require('./Author');
const Blog = require('./Blog');

Author.hasMany(Blog, {
  foreignKey: 'author_id',
});

Blog.belongsTo(Author, {
  foreignKey: 'author_id',
});

module.exports = { User, Author, Blog };