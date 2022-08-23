const Author = require('./Author');
const Blog = require('./Blog');

Author.hasMany(Blog, {
  foreignKey: 'author_name'
});

Blog.belongsTo(Author, {
  targetKey: 'author_name',
  foreignKey: 'author_name',
});

module.exports = { Author, Blog };