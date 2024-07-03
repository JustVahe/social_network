'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('requests', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID
			},
			from_id: {
				type: DataTypes.UUID
			},
			to_id: {
				type: DataTypes.UUID
			},
			status: {
				type: DataTypes.STRING
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE
			}
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable('requests');
	}
};