const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Warranty = sequelize.define(
  "Warranty",
  {
    warranty_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    exp_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // This enforces that it cannot be null
    },
    war_length: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    asset_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1",
    },
  },
  {
    tableName: "warranty",
    timestamps: false,
  }
);

module.exports = Warranty;
