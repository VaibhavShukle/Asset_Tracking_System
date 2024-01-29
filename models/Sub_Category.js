const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Sub_Category = sequelize.define(
  "Sub_Category",
  {
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    subcategory_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1",
    },

    category_id: {
      type: DataTypes.INTEGER, // Assuming category_id is an integer
      allowNull: false,
      references: {
        model: "category", // Name of the referenced table
        key: "category_id", // Name of the referenced column
      },
    },
  },

  {
    tableName: "sub_category",
    timestamps: false,
  }
);

module.exports = Sub_Category;
