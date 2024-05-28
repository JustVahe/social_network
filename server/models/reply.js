'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Comment}) {
      
      this.belongsTo(User, {foreignKey: "user_id", as: "user"});
      this.belongsTo(Comment, {foreignKey: "comment_id", as: "comment"});

    }
  }
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
    tableName: "replies",
    modelName: 'Reply',
  });
  return Reply;
};