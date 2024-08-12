'use strict';

import { DataTypes, Sequelize } from "sequelize";
import { ID, IPost, IChat, IUser } from "../src/utils/types/types.ts";
import { Model } from "sequelize";
import Connection from "./connection.ts";
import Message from "./message.ts";

export default class Chat extends Model<IChat> implements IChat {

  declare id: ID;
  declare name: string;
  declare avatar: string;
  declare description: string;

  public static associations: {
    // Define association types here
  };

  static associate() {
    this.hasMany(Message, { foreignKey: "room_id", as: "messages" });
    this.hasMany(Connection, { foreignKey: "chat_id", as: "connections" });
  }

  public static initialize(sequelize: Sequelize) {
    Chat.init({
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: "/assets/defaultAvatar.jpg"
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: "This chat has no description yet"
      }
    }, {
      sequelize,
      modelName: 'Chat',
      tableName: "chats"
    });
  }
}