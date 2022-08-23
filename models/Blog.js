const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { format_date } = require('../utils/helpers');

class Blog extends Model {}

Blog.init(
  {
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_date: {
      type: DataTypes.DATEONLY,
      get: format_date(),
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = Blog;
