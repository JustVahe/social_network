'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('comments',
      [
        {
          id: "3e3a3090-a09a-4d1a-9c2c-8686a4de320f",
          user_id: "2a72aecc-fbd2-40c8-a7aa-e9e9131ea3ac",
          post_id: "7569e855-e48b-43aa-b4b4-974d9bb8e306",
          message: "Good luck",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
        {
          id: "23572c3f-ed91-4256-80d8-582697c86340",
          user_id: "2a72aecc-fbd2-57f8-a7aa-e9e4456ea3ac",
          post_id: "7819e855-e48b-43aa-b4b4-974d9bb8e336",
          message: "Wish you the best",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
