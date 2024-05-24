'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('replies',
      [
        {
          id: "e0f4af6f-87d7-4096-9422-1a9599b3d520",
          user_id: "2a72aecc-fbd2-57f8-a7aa-e9e4456ea3ac",
          comment_id: "3e3a3090-a09a-4d1a-9c2c-8686a4de320f",
          message: "How are you?",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
        {
          id: "23572c3f-ed91-4256-80d8-582697c86340",
          user_id: "2a72aecc-fbd2-40c8-a7aa-e9e9131ea3ac",
          comment_id: "3e3a3090-a09a-4d1a-9c2c-8686a4de320f",
          message: "I am feeling perfect bro!",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
        {
          id: "24be7819-6bd1-4a35-a056-1ac15fadb820",
          user_id: "2a72aecc-fbd2-57f8-a7aa-e9e4456ea3ac",
          comment_id: "3e3a3090-a09a-4d1a-9c2c-8686a4de320f",
          message: "That's great. I am also pretty fine!",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('replies', null, {});
  }
};
