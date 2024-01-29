const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Checkin = sequelize.define(
  "Checkin",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    checkin_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    dept_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    tableName: "checkin",
    timestamps: false,
  }
);

module.exports = Checkin;
