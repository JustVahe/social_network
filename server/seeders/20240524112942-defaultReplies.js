'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('replies',
      [
        {
          id: "e0f4af6f-87d7-4096-9422-1a9599b3d520",
          user_id: "2a72aecc-fbd2-57f8-a7aa-e9e4456ea3ac",
          comment_id: "e4772c3f-ed91-4256-80d8-582697c75440",
          message: "How are you?",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
        {
          id: "23572c3f-ed91-4256-80d8-582697c86340",
          user_id: "bd7f6879-7fba-422b-958e-e26608833ffa",
          comment_id: "e4772c3f-ed91-4256-80d8-582697c75440",
          message: "I am feeling perfect bro!",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
        {
          id: "24be7819-6bd1-4a35-a056-1ac15fadb820",
          user_id: "2a72aecc-fbd2-57f8-a7aa-e9e4456ea3ac",
          comment_id: "e4772c3f-ed91-4256-80d8-582697c75440",
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
