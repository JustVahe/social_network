'use strict';

import { DataTypes, Sequelize } from "sequelize";
import { ID, IReply } from "../src/utils/types/types.ts";
import { Model } from "sequelize";
import User from "./user.ts";
import Comment from "./comment.ts";

export default class Reply extends Model<IReply> implements IReply {

  declare id: ID;
  declare comment_id: ID;
  declare user_id: ID;
  declare message: string;

  public static associations: {
    // Define association types here
  };

  static associate() {
    this.belongsTo(User, {foreignKey: "user_id", as: "user"});
    this.belongsTo(Comment, {foreignKey: "comment_id", as: "comment"});
  }

  public static initialize(sequelize: Sequelize) {
    Reply.init({
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
          comment_id: {
            type: DataTypes.UUID,
            allowNull: false
          },
          message: {
            type: DataTypes.STRING,
            allowNull: false
          }
    }, {
      sequelize,
      modelName: 'Reply',
      tableName: "replies"
    });
  }
}