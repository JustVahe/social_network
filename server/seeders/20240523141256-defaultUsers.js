'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {

		await queryInterface.bulkInsert('users',
			[
				{
					id: "8312288c-535b-414b-b5fc-5cd35fd0c576",
					name: "Vazgen",
					surname: "Meliqyan",
					username: "vazgen_meliqyan_synopsys",
					email: "vazgen.melikyan@synopsys.com",
					password: "$2a$12$q1d5iksVrUSkE0MvVxrjrerCLVfweQIfbxDFYn0rlef6tkwR254A2",
					description: "Director of Synopsys Education Department",
					avatar: "/assets/defaultAvatar.jpg",
					headerImg: "/assets/defaultHeader.jpg",
					createdAt: "2023-12-20T15:20:00+03:00",
					updatedAt: "2023-12-20T15:20:00+03:00"
				}, {
					id: "2a72aecc-fbd2-40c8-a7aa-e9e9131ea3ac",
					name: "Karen",
					surname: "Meliqyan",
					username: "karen_meliqyan_synopsys",
					email: "karen.melikyan@synopsys.com",
					password: "$2a$12$lN1dEdRoqxl8LGss2l149edC9Pkee2WYM.j3qsAu1NHvIgvelLEpC",
					description: "IC Engineer at Synopsys",
					avatar: "/assets/defaultAvatar.jpg",
					headerImg: "/assets/defaultHeader.jpg",
					createdAt: "2023-12-20T15:20:00+03:00",
					updatedAt: "2023-12-20T15:20:00+03:00"
				}, {
					id: "2a72aecc-fbd2-57f8-a7aa-e9e4456ea3ac",
					name: "Aram",
					surname: "Vardanyan",
					username: "aram_vardanyan_synopsys",
					email: "aram.vardanyan@synopsys.com",
					password: "$2a$12$lN1dEdRoqxl8LGss2l149edC9Pkee2WYM.j3qsAu1NHvIgvelLEpC",
					description: "EDA Software Engineer at Synopsys",
					avatar: "/assets/defaultAvatar.jpg",
					headerImg: "/assets/defaultHeader.jpg",
					createdAt: "2023-12-20T15:20:00+03:00",
					updatedAt: "2023-12-20T15:20:00+03:00"
				},
				{
					id: "5482be00-3778-4705-a54a-cdf4778e0c6e",
					name: "Zorayr",
					surname: "Melkonyan",
					username: "zorayr_melkonyan_epam",
					email: "zorayr_melkonyan@epam.com",
					password: "$2a$08$QI5q6wHqaTr2KW4eAQEez.9khj0OLRd0S6As8xVEZE0yczv.xc0IO",
					description: "Lead C++ Developer at Epam",
					avatar: "/assets/defaultAvatar.jpg",
					headerImg: "/assets/defaultHeader.jpg",
					createdAt: "2023-12-20T15:20:00+03:00",
					updatedAt: "2023-12-20T15:20:00+03:00"
				},
				{
					id: "d183d6ba-1980-4215-a996-759999b2f094",
					name: "Naira",
					surname: "Aharonyan",
					username: "naira_aharonyan_epam",
					email: "naira_aharonyan@epam.com",
					password: "$2a$08$NGZpv2.1y0VDN33YTk2Dl.nXXKysRzWZ.cNk1Ao/HXyqQaj3X1Yz.",
					description: "Middle Frontent Dveloper At Epam",
					avatar: "/assets/defaultAvatar.jpg",
					headerImg: "/assets/defaultHeader.jpg",
					createdAt: "2023-12-20T15:20:00+03:00",
					updatedAt: "2023-12-20T15:20:00+03:00"
				},
				{
					id: "bd7f6879-7fba-422b-958e-e26608833ffa",
					name: "Vardan",
					surname: "Ghazaryan",
					username: "vardan_ghazaryan_iguan",
					email: "vardan_ghazaryan@iguan.com",
					password: "$2a$08$jGhPpcg43zSm0wj.Yz/NEeRq5Rp5w3c0yOZDF2cynURxQiz5UyxD6",
					avatar: "/assets/defaultAvatar.jpg",
					headerImg: "/assets/defaultHeader.jpg",
					createdAt: "2023-12-20T15:20:00+03:00",
					updatedAt: "2023-12-20T15:20:00+03:00"
				},
			], {});

	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {});
	}
};
