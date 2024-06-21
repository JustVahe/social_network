'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Message extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({User}) {
			this.belongsTo(User, {foreignKey: "from", as:"from"})
		}
	}
	Message.init({
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4()
		},
		from: {
			type: DataTypes.UUID,
			allowNull: false
		},
		message: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'Message',
		tableName: "messages"
	});
	return Message;
};