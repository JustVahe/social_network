'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('friends', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID
			},
			user_a_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			user_b_id: {
				type: DataTypes.UUID,
				allowNull: false,
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
		await queryInterface.dropTable('friends');
	}
};