'use strict';
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import User from "./user.ts";
import Comment from "./comment.ts";
export default class Reply extends Model {
    static associations;
    static associate() {
        this.belongsTo(User, { foreignKey: "user_id", as: "user" });
        this.belongsTo(Comment, { foreignKey: "comment_id", as: "comment" });
    }
    static initialize(sequelize) {
        Reply.init({
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            comment_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Reply',
            tableName: "replies"
        });
    }
}
