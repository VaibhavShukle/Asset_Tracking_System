const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const AssetBrand = sequelize.define(
  "AssetBrand",
  {
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    brand_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1",
    },
  },
  {
    tableName: "brand",
    timestamps: false,
  }
);

module.exports = AssetBrand;
