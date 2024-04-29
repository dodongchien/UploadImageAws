"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Image.init(
    {
      images: {
        type: DataTypes.TEXT, // Hoặc DataTypes.STRING
        get() {
          const value = this.getDataValue("images");
          return value ? JSON.parse(value) : [];
        },
        set(value) {
          // Chuyển đổi mảng thành chuỗi JSON khi lưu dữ liệu
          this.setDataValue("images", JSON.stringify(value));
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
      timestamps: true,
    }
  );
  return Image;
};
