"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class runningTournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  runningTournament.init(
    {
      name: { type: DataTypes.STRING },
      images: { type: DataTypes.STRING },
      startDate: { type: DataTypes.DATE },
      endDate: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "runningTournament",
      timestamps: true,
    }
  );
  return runningTournament;
};
