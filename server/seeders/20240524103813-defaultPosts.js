'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('posts',
      [
        {
          id: "7819e855-e48b-43aa-b4b4-974d9bb8b445",
          user_id: "5482be00-3778-4705-a54a-cdf4778e0c6e",
          message: "Glad to become part of Epam",
          likes: 300,
          dislikes: 20,
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },{
          id: "7819e855-e48b-43aa-b5b4-974d9bb8e336",
          user_id: "5482be00-3778-4705-a54a-cdf4778e0c6e",
          message: "I've tried to make a website fully with assembler, so you didn't have to!",
          likes: 300,
          dislikes: 20,
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
