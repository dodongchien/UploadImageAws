"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      images: {
        type: DataTypes.TEXT, // Hoặc DataTypes.STRING
        get() {
          // Chuyển đổi chuỗi JSON thành mảng khi truy xuất dữ liệu
          const value = this.getDataValue("images");
          return value ? JSON.parse(value) : [];
        },
        set(value) {
          // Chuyển đổi mảng thành chuỗi JSON khi lưu dữ liệu
          this.setDataValue("images", JSON.stringify(value));
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Images");
  },
};
