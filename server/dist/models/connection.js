'use strict';
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import Chat from "./chat.ts";
import User from "./user.ts";
export default class Connection extends Model {
    static associations;
    static associate() {
        this.belongsTo(Chat, { foreignKey: "chat_id", as: "chat" });
        this.belongsTo(User, { foreignKey: "user_id", as: "user" });
    }
    static initialize(sequelize) {
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
