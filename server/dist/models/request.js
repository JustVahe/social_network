'use strict';
import { DataTypes, Model } from "sequelize";
import User from "./user.ts";
export default class FriendRequest extends Model {
    static associations;
    static associate() {
        this.belongsTo(User, { foreignKey: "from_id", as: "from" });
        this.belongsTo(User, { foreignKey: "to_id", as: "to" });
    }
    static initialize(sequelize) {
        FriendRequest.init({
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            from_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            to_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM("approved", "pending", "rejected"),
                defaultValue: "pending"
            }
        }, {
            sequelize,
            modelName: 'Request',
            tableName: "requests"
        });
    }
}
