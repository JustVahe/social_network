'use strict';
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import Post from "./post.ts";
export default class Reaction extends Model {
    static associations;
    static associate() {
        this.belongsTo(Post, { foreignKey: "post_id", as: "post" });
    }
    static initialize(sequelize) {
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
