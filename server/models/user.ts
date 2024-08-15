'use strict';

import { Sequelize, DataTypes } from "sequelize";
import { IUser } from "../src/utils/types/types.ts";
import { Model } from "sequelize";
import File from "./file.ts";
import Post from "./post.ts";
import { config as dotenvConfig } from "dotenv"; dotenvConfig();

export default class User extends Model<IUser> implements IUser {
  declare id: string;
  declare name: string;
  declare surname: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare description: string;
  declare avatar: string;
  declare headerImg: string;
  declare status: string;

  public static associations: {
    // Define association types here
  };

  static associate() {
    this.hasMany(File, { foreignKey: "user_id", as: "files" });
    this.hasMany(Post, { foreignKey: "user_id", as: "posts" });
  }

  public static initialize(sequelize: Sequelize) {
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
        defaultValue: `/${process.env.SUPABASE_BUCKET}/defaultAvatar.webp`
      },
      headerImg: {
        type: DataTypes.STRING,
        defaultValue: `/${process.env.SUPABASE_BUCKET}/defaultHeader.webp`
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
  }
}