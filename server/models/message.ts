'use strict';

import { DataTypes, Sequelize } from "sequelize";
import { ID, IPost, IMessage, IUser } from "../src/utils/types/types.ts";
import { Model } from "sequelize";
import Chat from "./chat.ts";
import User from "./user.ts";
import Room from "./room.ts";

export default class Message extends Model<IMessage> implements IMessage {

  declare id: ID;
  declare from_id: ID;
  declare room_id: ID;
  declare message: string;

  public static associations: {
    // Define association types here
  };

  static associate() {
    this.belongsTo(User, { foreignKey: "from_id", as: "from" })
    this.belongsTo(Room, { foreignKey: "room_id", as: "room" })
    this.belongsTo(Chat, { foreignKey: "room_id", as: "chat" })
  }

  public static initialize(sequelize: Sequelize) {
    Message.init({
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4()
      },
      from_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      room_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Message',
      tableName: "messages"
    });
  }
}