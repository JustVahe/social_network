'use strict';

import { ModelStatic } from "sequelize";
import { Sequelize } from "sequelize";
import { IUser } from "../src/utils/types/types";
import { DataTypesInterface } from "../src/utils/types/sequelizeTypes";
import { Model } from "sequelize";

interface IUserModels {
  Post: ModelStatic<Model>
}

module.exports = (sequelize: Sequelize, DataTypes: DataTypesInterface) => {
  class User extends Model<IUser> implements IUser {

    id!: string;
    name!: string;
    surname!: string;
    username!: string;
    email!: string;
    password!: string;
    description!: string;
    avatar!: string;
    headerImg!: string;
    status!: string;

    static associate({Post} : IUserModels) {
      this.hasMany(Post, {foreignKey : "user_id", as: "posts"})
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
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" }
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Surname is required" },
        notEmpty: { msg: "Surname is required" }
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
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
        isEmail: { msg: "Email is not valid" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
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
    },
    status: {
      type: DataTypes.ENUM("offline", "online"),
      defaultValue: "offline"
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users"
  });
  return User;
};