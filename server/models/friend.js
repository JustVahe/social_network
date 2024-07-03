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
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		user_a_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		user_b_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'Friend',
		tableName: "friends"
	});
	return Friend;
};