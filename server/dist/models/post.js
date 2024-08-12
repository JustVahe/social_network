'use strict';
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import User from "./user.ts";
import File from "./file.ts";
import Comment from "./comment.ts";
export default class Post extends Model {
    static associations;
    static associate() {
        this.belongsTo(User, { foreignKey: "user_id", as: "user" });
        this.hasMany(File, { foreignKey: "post_id", as: "files" });
        this.hasMany(Comment, { foreignKey: "post_id", as: "comments" });
    }
    static initialize(sequelize) {
        Post.init({
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
            message: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Post',
            tableName: "posts"
        });
    }
}
