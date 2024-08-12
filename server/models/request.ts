'use strict';

import { DataTypes, Sequelize, Model } from "sequelize";
import { ID, IRequest } from "../src/utils/types/types.ts";
import User from "./user.ts";

export default class FriendRequest extends Model<IRequest> implements IRequest {

    declare id: ID;
    declare from_id: ID;
    declare to_id: ID;
    declare status: "approved" | "pending" | "rejected";

    public static associations: {
        // Define association types here
    };

    static associate() {
        this.belongsTo(User, { foreignKey: "from_id", as: "from" });
        this.belongsTo(User, { foreignKey: "to_id", as: "to" });
    }

    public static initialize(sequelize: Sequelize) {
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