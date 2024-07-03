'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate({User, Message}) {
      this.belongsTo(User, {foreignKey: "user_a_id", as: "user_a"});
      this.belongsTo(User, {foreignKey: "user_b_id", as: "user_b"});
      this.hasMany(Message, {foreignKey: "room_id", as: "messages"});
    }
  }
  Room.init({
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
  }, {
    sequelize,
    modelName: 'Room',
    tableName: "rooms"
  });
  return Room;
};