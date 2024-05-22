'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      post_id: {
        type: DataTypes.UUID,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER
      },
      dislikes: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('posts');
  }
};