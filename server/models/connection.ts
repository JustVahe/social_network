'use strict';

import { DataTypes, Sequelize } from "sequelize";
import { ID, IPost, IConnection, IUser } from "../src/utils/types/types.ts";
import { Model } from "sequelize";
import Chat from "./chat.ts";
import User from "./user.ts";

export default class Connection extends Model<IConnection> implements IConnection {

  declare id: ID;
  declare chat_id: ID;
  declare user_id: ID;
  declare type: "user" | "chat";

  public static associations: {
    // Define association types here
  };

  static associate() {
    this.belongsTo(Chat, { foreignKey: "chat_id", as: "chat" })
    this.belongsTo(User, { foreignKey: "user_id", as: "user" })
  }

  public static initialize(sequelize: Sequelize) {
    Connection.init({
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      chat_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Connection',
      tableName: "connections"
    });
  }
}