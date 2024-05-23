'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post, Reply }) {

      this.hasMany(Reply, { foreignKey: "comment_id", as: "replies" });
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
      this.belongsTo(Post, {foreignKey:"post_id", as: "post"});

    }
  }
  Comment.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: "comments",
    modelName: 'Comment',
  });
  return Comment;
};