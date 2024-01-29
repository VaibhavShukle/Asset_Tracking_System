const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Main_Status = sequelize.define(
  "Main_Status",
  {
    mainStatus_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    mainStatus_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    tableName: "main_status",
    timestamps: false,
  }
);

module.exports = Main_Status;
