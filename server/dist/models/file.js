'use strict';
import { DataTypes } from "sequelize";
import { Model } from 'sequelize';
import User from "./user.ts";
import Post from "./post.ts";
export default class File extends Model {
    static associations;
    static associate() {
        this.belongsTo(Post, { foreignKey: "post_id", as: "post" });
        this.belongsTo(User, { foreignKey: "user_id", as: "user" });
    }
    static initialize(sequelize) {
        File.init({
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
                allowNull: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'File',
            tableName: "files"
        });
    }
}
