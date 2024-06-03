'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('files', [
      {
        id: "e19a24ba-3294-475e-b095-6d4fa240839f",
        user_id: "8312288c-535b-414b-b5fc-5cd35fd0c576",
        post_id: "7569e855-e48b-43aa-b4b4-974d9bb8e306",
        type: "jpg",
        path: "/assets/images/e19a24ba-3294-475e-b095-6d4fa240839f.jpg",
        createdAt : "2023-12-20T15:20:00+03:00",
        updatedAt: "2023-12-20T15:20:00+03:00"
      },
      {
        id: "cc1b3bbe-9f02-4ca2-a700-5456cc462b78",
        user_id: "8312288c-535b-414b-b5fc-5cd35fd0c576",
        post_id: "7819e855-e48b-43aa-b4b4-974d9bb8e336",
        type: "jpg",
        path: "/assets/images/e19a24ba-3294-475e-b095-6d4fa240839f.jpg",
        createdAt : "2023-12-20T15:20:00+03:00",
        updatedAt: "2023-12-20T15:20:00+03:00"
      },
      {
        id: "ad2bcbb7-487d-48a9-b45a-68c49789fd8d",
        user_id: "5482be00-3778-4705-a54a-cdf4778e0c6e",
        post_id: "7819e855-e48b-43aa-b4b4-974d9bb8b445",
        type: "png",
        path: "/assets/images/ad2bcbb7-487d-48a9-b45a-68c49789fd8d.png",
        createdAt : "2023-12-20T15:20:00+03:00",
        updatedAt: "2023-12-20T15:20:00+03:00"
      },
      {
        id: "23f1d4d0-4e5c-4915-abea-87a653995a7f",
        user_id: "5482be00-3778-4705-a54a-cdf4778e0c6e",
        post_id: "7819e855-e48b-43aa-b5b4-974d9bb8e336",
        type: "png",
        path: "/assets/images/23f1d4d0-4e5c-4915-abea-87a653995a7f.png",
        createdAt : "2023-12-20T15:20:00+03:00",
        updatedAt: "2023-12-20T15:20:00+03:00"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('files', null, {});
  }
};
