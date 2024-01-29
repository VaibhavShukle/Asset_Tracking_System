const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Image = sequelize.define(
  "Image",
  {
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // status: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: "active",
    // },

    asset_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "images",
    timestamps: false,
  }
);

module.exports = Image;
