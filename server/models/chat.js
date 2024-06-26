'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Message, Connection}) {
      this.hasMany(Message, {foreignKey: "room_id", as: "messages"});
      this.hasMany(Connection, {foreignKey: "chat_id", as: "connections"});
    }
  }
  Chat.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Chat',
    tableName: "chats"
  });
  return Chat;
};