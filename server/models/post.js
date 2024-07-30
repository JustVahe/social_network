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
    static associate({ File, User, Comment, Reaction }) {
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
      this.hasMany(File, { foreignKey: "post_id", as: "files" });
      this.hasMany(Comment, { foreignKey: "post_id", as: "comments" });
      this.hasMany(Reaction, {foreignKey: "post_id", as: "reactions"});
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
      allowNull: true
    }
  }, {
    sequelize,
    tableName: "posts",
    modelName: 'Post',
  });
  return Post;
};