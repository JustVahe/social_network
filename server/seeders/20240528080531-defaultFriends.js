'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     
    */
    await queryInterface.bulkInsert('friends',
      [
        {
          id: "ed86dc6b-7048-4d11-a34c-9199cd43c847",
          user_a_id: "2a72aecc-fbd2-40c8-a7aa-e9e9131ea3ac",
          user_b_id: "8312288c-535b-414b-b5fc-5cd35fd0c576",
          status: "approved",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
        {
          id: "42089b6f-2846-4f69-9099-6d463c505652",
          user_a_id: "2a72aecc-fbd2-57f8-a7aa-e9e4456ea3ac",
          user_b_id: "8312288c-535b-414b-b5fc-5cd35fd0c576",
          status: "approved",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
        {
          id: "417fa433-5b6b-444f-bbae-54a559b0cda2",
          user_a_id: "5482be00-3778-4705-a54a-cdf4778e0c6e",
          user_b_id: "8312288c-535b-414b-b5fc-5cd35fd0c576",
          status: "pending",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
      ],
      {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('friends', null, {});
  }
};
