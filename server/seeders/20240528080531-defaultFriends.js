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
          user_id: "2a72aecc-fbd2-40c8-a7aa-e9e9131ea3ac",
          belongsTo_id: "9dc3c7d3-65ce-4494-ae44-314adb518c88",
          status: "approved",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
        {
          id: "42089b6f-2846-4f69-9099-6d463c505652",
          user_id: "2a72aecc-fbd2-57f8-a7aa-e9e4456ea3ac",
          belongsTo_id: "9dc3c7d3-65ce-4494-ae44-314adb518c88",
          status: "approved",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
        {
          id: "417fa433-5b6b-444f-bbae-54a559b0cda2",
          user_id: "5482be00-3778-4705-a54a-cdf4778e0c6e",
          belongsTo_id: "9dc3c7d3-65ce-4494-ae44-314adb518c88",
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
