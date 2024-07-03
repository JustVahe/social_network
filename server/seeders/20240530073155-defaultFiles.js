'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('files', [
      {
        id: "ad2bcbb7-487d-48a9-b45a-68c49789fd8d",
        user_id: "5482be00-3778-4705-a54a-cdf4778e0c6e",
        post_id: "7819e855-e48b-43aa-b4b4-974d9bb8b445",
        type: "image",
        path: "/assets/5482be00-3778-4705-a54a-cdf4778e0c6e/images/posts/ad2bcbb7-487d-48a9-b45a-68c49789fd8d.png",
        createdAt : "2023-12-20T15:20:00+03:00",
        updatedAt: "2023-12-20T15:20:00+03:00"
      },
      {
        id: "23f1d4d0-4e5c-4915-abea-87a653995a7f",
        user_id: "5482be00-3778-4705-a54a-cdf4778e0c6e",
        post_id: "7819e855-e48b-43aa-b5b4-974d9bb8e336",
        type: "image",
        path: "/assets/5482be00-3778-4705-a54a-cdf4778e0c6e/images/posts/23f1d4d0-4e5c-4915-abea-87a653995a7f.png",
        createdAt : "2023-12-20T15:20:00+03:00",
        updatedAt: "2023-12-20T15:20:00+03:00"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('files', null, {});
  }
};
