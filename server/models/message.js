'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Message extends Model {
		static associate({ User, Room }) {
			this.belongsTo(User, { foreignKey: "from_id", as: "from" })
			this.belongsTo(Room, {foreignKey: "room_id", as: "room"})
		}
	}
	Message.init({
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4()
		},
		from_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		room_id: {
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