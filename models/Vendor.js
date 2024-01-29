const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Vendor = sequelize.define(
  "Vendor",
  {
    v_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    v_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    v_phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    v_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    v_details: {
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
    tableName: "vendor",
    timestamps: false,
  }
);

module.exports = Vendor;
