'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Connection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Chat,User}) {
      this.belongsTo(Chat, {foreignKey: "chat_id", as : "chat"})
      this.belongsTo(User, {foreignKey: "user_id", as : "user"})
    }
  }
  Connection.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }, chat_id: {
      type: DataTypes.UUID,
      allowNull: false
    }, user_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Connection',
    tableName: 'connections'
  });
  return Connection;
};