'use strict';
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import User from "./user.ts";
import Message from "./message.ts";
export default class Room extends Model {
    static associations;
    static associate() {
        this.belongsTo(User, { foreignKey: "user_a_id", as: "user_a" });
        this.belongsTo(User, { foreignKey: "user_b_id", as: "user_b" });
        this.hasMany(Message, { foreignKey: "room_id", as: "messages" });
    }
    static initialize(sequelize) {
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
