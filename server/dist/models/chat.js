'use strict';
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import Connection from "./connection.ts";
import Message from "./message.ts";
export default class Chat extends Model {
    static associations;
    static associate() {
        this.hasMany(Message, { foreignKey: "room_id", as: "messages" });
        this.hasMany(Connection, { foreignKey: "chat_id", as: "connections" });
    }
    static initialize(sequelize) {
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
