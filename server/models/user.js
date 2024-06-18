'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ File, Post, Comment }) {
      this.hasMany(File, { foreignKey: "user_id", as: "files" });
      this.hasMany(Post, { foreignKey: "user_id", as: "posts" });
      this.hasMany(Comment, { foreignKey: "user_id", as: "comments" }); 
    }

  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { message: "Name is required" },
        notEmpty: { message: "Name is required" }
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { message: "Surname is required" },
        notEmpty: { message: "Surname is required" }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { message: "Email is required" },
        notEmpty: { message: "Email is required" },
        isEmail: { message: "Email is not valid" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { message: "Email is required" },
        notEmpty: { message: "Email is required" },
      }
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "This user has no description yet"
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "/assets/defaultAvatar.jpg"
    },
    headerImg: {
      type: DataTypes.STRING,
      defaultValue: "/assets/defaultHeader.jpg"
    }
  }, {
    sequelize,
    tableName: "users",
    modelName: 'User',
  });
  return User;
};