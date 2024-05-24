'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users',
      [
        {
          id: "9dc3c7d3-65ce-4494-ae44-314adb518c88",
          name: "Vazgen",
          surname: "Meliqyan",
          username: "@vazgen_meliqyan_synopsys",
          email: "vazgen.melikyan@synopsys.com",
          password: "$2a$12$q1d5iksVrUSkE0MvVxrjrerCLVfweQIfbxDFYn0rlef6tkwR254A2",
          avatar: "./assets/defaultAvatar.jpg",
          headerImg: "./assets/defaultHeader.jpg",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },{
          id: "2a72aecc-fbd2-40c8-a7aa-e9e9131ea3ac",
          name: "Karen",
          surname: "Meliqyan",
          username: "@karen_meliqyan_synopsys",
          email: "karen.melikyan@synopsys.com",
          password: "$2a$12$lN1dEdRoqxl8LGss2l149edC9Pkee2WYM.j3qsAu1NHvIgvelLEpC",
          avatar: "./assets/defaultAvatar.jpg",
          headerImg: "./assets/defaultHeader.jpg",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },{
          id: "2a72aecc-fbd2-57f8-a7aa-e9e4456ea3ac",
          name: "Aram",
          surname: "Vardanyan",
          username: "@aram_vardanyan_synopsys",
          email: "aram.vardanyan@synopsys.com",
          password: "$2a$12$lN1dEdRoqxl8LGss2l149edC9Pkee2WYM.j3qsAu1NHvIgvelLEpC",
          avatar: "./assets/defaultAvatar.jpg",
          headerImg: "./assets/defaultHeader.jpg",
          createdAt : "2023-12-20T15:20:00+03:00",
          updatedAt: "2023-12-20T15:20:00+03:00"
        },
      ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
