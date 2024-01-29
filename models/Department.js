const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Department = sequelize.define(
  "Department",
  {
    dept_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    dept_name: {
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
    tableName: "department",
    timestamps: false,
  }
);

module.exports = Department;
