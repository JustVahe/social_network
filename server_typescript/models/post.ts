'use strict';

import { Sequelize } from "sequelize";
import { IComment, ID, IPhoto, IPost, IReaction, IUser } from "../src/utils/types/types";
import { DataTypesInterface } from "../src/utils/types/sequelizeTypes";
import { Model } from "sequelize";

module.exports = (sequelize : Sequelize, DataTypes : DataTypesInterface) => {
  class Post extends Model<IPost> implements IPost {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: ID;
    message!: string;
    user_id!: ID;

    static associate(models : any) {
      // define association here
    }
  }
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
  return Post;
};