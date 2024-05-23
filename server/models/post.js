'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ File, User, Comment }) {

      this.hasMany(File, { foreignKey: "post_id", as: "files" });
      this.hasMany(Comment, { foreignKey: "post_id", as: "comments" })
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });

    }
  }
  Post.init({
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
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    dislikes: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName: "posts",
    modelName: 'Post',
  });
  return Post;
};