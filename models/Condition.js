const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Condition = sequelize.define(
  "Condition",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    condition: {
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
    tableName: "asset_condition",
    timestamps: false,
  }
);

module.exports = Condition;
