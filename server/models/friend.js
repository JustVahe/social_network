'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    static associate({ User }) {
      this.belongsTo(User, {foreignKey: "user_a_id", as: "user_a"});
      this.belongsTo(User, {foreignKey: "user_b_id", as: "user_b"});
    }
  }
  Friend.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_a_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_b_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("pending","approved","rejected"),
    }
  }, {
    sequelize,
    tableName: "friends",
    modelName: 'Friend',
  });
  return Friend;
};