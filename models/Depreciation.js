const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Depreciation = sequelize.define(
  "Depreciation",
  {
    depreciation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    depreciation_percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    asset_life: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    tableName: "depreciation",
    timestamps: false,
  }
);

module.exports = Depreciation;
