const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Author extends Model {}

Author.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      }
    },
    author_name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'author',
  }
);

module.exports = Author;
