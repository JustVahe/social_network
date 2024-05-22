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
    static associate(models) {
      // define association here
    }
  }
  User.init({
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {message: "Name is required"},
        notEmpty: {message: "Name is required"}
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {message: "Surname is required"},
        notEmpty: {message: "Surname is required"}
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   notNull: {message: "Username is required"},
      //   notEmpty: {message: "Username is required"}
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {message: "Email is required"},
        notEmpty: {message: "Email is required"},
        isEmail: {message: "Email is not valid"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {message: "Email is required"},
        notEmpty: {message: "Email is required"},
      }
    }
  }, {
    sequelize,
    tableName: "users",
    modelName: 'User',
  });
  return User;
};