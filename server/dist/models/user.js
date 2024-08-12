'use strict';
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import File from "./file.ts";
import Post from "./post.ts";
export default class User extends Model {
    static associations;
    static associate() {
        this.hasMany(File, { foreignKey: "user_id", as: "files" });
        this.hasMany(Post, { foreignKey: "user_id", as: "posts" });
    }
    static initialize(sequelize) {
        User.init({
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Name is required" },
                    notEmpty: { msg: "Name is required" }
                }
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Surname is required" },
                    notEmpty: { msg: "Surname is required" }
                }
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Email is required" },
                    notEmpty: { msg: "Email is required" },
                    isEmail: { msg: "Email is not valid" }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Email is required" },
                    notEmpty: { msg: "Email is required" },
                }
            },
            description: {
                type: DataTypes.STRING,
                defaultValue: "This user has no description yet"
            },
            avatar: {
                type: DataTypes.STRING,
                defaultValue: "/assets/defaultAvatar.jpg"
            },
            headerImg: {
                type: DataTypes.STRING,
                defaultValue: "/assets/defaultHeader.jpg"
            },
            status: {
                type: DataTypes.ENUM("offline", "online"),
                defaultValue: "offline"
            }
        }, {
            sequelize,
            modelName: 'User',
            tableName: "users"
        });
    }
}
