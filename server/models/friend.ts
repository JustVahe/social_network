'use strict';

import { DataTypes, Sequelize, Model } from "sequelize";
import { ID, IFriend } from "../src/utils/types/types.ts";
import User from "./user.ts";

export default class Friend extends Model<IFriend> implements IFriend {

    declare id: ID;
    declare user_a_id: ID;
    declare user_b_id: ID;

    public static associations: {
        // Define association types here
    };

    static associate() {
        this.belongsTo(User, { foreignKey: "user_a_id", as: "user_a" });
        this.belongsTo(User, { foreignKey: "user_b_id", as: "user_b" });
    }

    public static initialize(sequelize: Sequelize) {
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