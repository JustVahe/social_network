'use strict';

import { DataTypes, Sequelize } from "sequelize";
import { Model } from 'sequelize';
import { ID, IFile } from "../src/utils/types/types.ts";
import { publicDecrypt } from "crypto";
import User from "./user.ts";
import Post from "./post.ts";

export default class File extends Model<IFile> implements IFile {

  declare id: ID;
  declare user_id: ID;
  declare post_id: ID;
  declare type: string;
  declare path: string;

  public static associations: {
    // Define association types here
  };

  static associate() {
    this.belongsTo(Post, { foreignKey: "post_id", as: "post" });
    this.belongsTo(User, { foreignKey: "user_id", as: "user" });
  }

  public static initialize(sequelize: Sequelize) {
    File.init({
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
        allowNull: true
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'File',
      tableName: "files"
    });
  }
}