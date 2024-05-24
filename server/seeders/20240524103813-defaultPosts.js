'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('posts',
      [
        {
          id: "7569e855-e48b-43aa-b4b4-974d9bb8e306",
          user_id: "8312288c-535b-414b-b5fc-5cd35fd0c576",
          message: "New academic year is starting in Synopsys!!",
          likes: 250,
          dislikes: 10,
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },{
          id: "7819e855-e48b-43aa-b4b4-974d9bb8e336",
          user_id: "8312288c-535b-414b-b5fc-5cd35fd0c576",
          message: "Audition is officially finished",
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
