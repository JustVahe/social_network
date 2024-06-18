'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('friends', [
			{
				id: "032bcae0-a27b-4d1f-a0cf-4a169119b48a",
				user_a_id: "2a72aecc-fbd2-40c8-a7aa-e9e9131ea3ac",
				user_b_id: "8312288c-535b-414b-b5fc-5cd35fd0c576",
				createdAt: "2023-12-20T15:20:00+03:00",
				updatedAt: "2023-12-20T15:20:00+03:00"
			}
		], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('friends', null, {});
	}
};
