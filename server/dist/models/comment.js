'use strict';
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import User from "./user.ts";
import Post from "./post.ts";
import Reply from "./reply.ts";
export default class Comment extends Model {
    static associations;
    static associate() {
        this.hasMany(Reply, { foreignKey: "comment_id", as: "replies" });
        this.belongsTo(User, { foreignKey: "user_id", as: "user" });
        this.belongsTo(Post, { foreignKey: "post_id", as: "post" });
    }
    static initialize(sequelize) {
        Comment.init({
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
            post_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Comment',
            tableName: "comments"
        });
    }
}
