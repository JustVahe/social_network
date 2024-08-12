'use strict';

import { DataTypes, Sequelize } from "sequelize";
import { ID, IPost, IRoom, IUser } from "../src/utils/types/types.ts";
import { Model } from "sequelize";
import User from "./user.ts";
import Message from "./message.ts";

export default class Room extends Model<IRoom> implements IRoom {

  declare id: ID;
  declare user_a_id: string;
  declare user_b_id: string;
  declare type: "user" | "chat";

  public static associations: {
    // Define association types here
  };

  static associate() {
    this.belongsTo(User, { foreignKey: "user_a_id", as: "user_a" });
    this.belongsTo(User, { foreignKey: "user_b_id", as: "user_b" });
    this.hasMany(Message, { foreignKey: "room_id", as: "messages" });
  }

  public static initialize(sequelize: Sequelize) {
    Room.init({
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      user_a_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      user_b_id: {
        type: DataTypes.UUID,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Room',
      tableName: "rooms"
    });
  }
}