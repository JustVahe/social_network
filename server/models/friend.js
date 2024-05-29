'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User, {foreignKey: "user_id", as: "user"});
      this.belongsTo(User, {foreignKey: "belongsTo_id", as: "belongsTo"});
    }
  }
  Friend.init({
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
    belongsTo_id: {
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