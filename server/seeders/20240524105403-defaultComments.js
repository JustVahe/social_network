'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('comments',
      [
        {
          id: "23572c3f-ed91-4256-80d8-582697c75440",
          user_id: "d183d6ba-1980-4215-a996-759999b2f094",
          post_id: "7819e855-e48b-43aa-b5b4-974d9bb8e336",
          message: "Great job!",
          createdAt: "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
        {
          id: "e4772c3f-ed91-4256-80d8-582697c75440",
          user_id: "bd7f6879-7fba-422b-958e-e26608833ffa",
          post_id: "7819e855-e48b-43aa-b5b4-974d9bb8e336",
          message: "Nice one",
          createdAt: "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
