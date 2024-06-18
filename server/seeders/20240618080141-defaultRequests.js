'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('requests', [
			{
				id: "032bcae0-a27b-4d1f-a0cf-4a169119b48a",
				from_id: "2a72aecc-fbd2-40c8-a7aa-e9e9131ea3ac",
				to_id: "8312288c-535b-414b-b5fc-5cd35fd0c576",
				status: "approved",
				createdAt: "2023-12-20T15:20:00+03:00",
				updatedAt: "2023-12-20T15:20:00+03:00"
			},
			{
				id: "2927746c-26e5-4a12-94f8-86d17933430e",
				from_id: "5482be00-3778-4705-a54a-cdf4778e0c6e",
				to_id: "8312288c-535b-414b-b5fc-5cd35fd0c576",
				status: "pending",
				createdAt: "2023-12-20T15:20:00+03:00",
				updatedAt: "2023-12-20T15:20:00+03:00"
			}
		], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('requests', null, {});
	}
};
