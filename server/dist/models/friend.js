'use strict';
import { DataTypes, Model } from "sequelize";
import User from "./user.ts";
export default class Friend extends Model {
    static associations;
    static associate() {
        this.belongsTo(User, { foreignKey: "user_a_id", as: "user_a" });
        this.belongsTo(User, { foreignKey: "user_b_id", as: "user_b" });
    }
    static initialize(sequelize) {
        Friend.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            user_a_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            user_b_id: {
                type: DataTypes.UUID,
                allowNull: false,
            }
        }, {
            sequelize,
            modelName: 'Friend',
            tableName: "friends"
        });
    }
}
