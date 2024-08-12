'use strict';

import { DataTypes, Sequelize } from "sequelize";
import { ID, IReaction } from "../src/utils/types/types.ts";
import { Model } from "sequelize";
import Post from "./post.ts";

export default class Reaction extends Model<IReaction> implements IReaction {

    declare id: ID;
    declare post_id: ID;
    declare user_id: ID;
    declare type: "like" | "dislike";

    public static associations: {
        // Define association types here
    };

    static associate() {
        this.belongsTo(Post, { foreignKey: "post_id", as: "post" });
    }

    public static initialize(sequelize: Sequelize) {
        Reaction.init({
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            type: {
                type: DataTypes.ENUM("like", "dislike"),
                allowNull: false
            },
            post_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
        }, {
            sequelize,
            modelName: 'Reaction',
            tableName: "reactions"
        });
    }
}