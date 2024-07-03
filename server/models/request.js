'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Request extends Model {
		static associate({ User }) {
			this.belongsTo(User, { foreignKey: "from_id", as: "from" });
			this.belongsTo(User, { foreignKey: "to_id", as: "to" });
		}
	}
	Request.init({
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		from_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		to_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		status: {
			type: DataTypes.ENUM("approved", "pending", "rejected"),
			defaultValue: "pending"
		}
	}, {
		sequelize,
		modelName: 'Request',
		tableName: "requests"
	});
	return Request;
};