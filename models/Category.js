const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Asset = require("./Asset");

const Category = sequelize.define(
  "Category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
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
    tableName: "category",
    timestamps: false,
  }
);

// Category.hasMany(Asset);
// Asset.belongsTo(Category);

// Category.belongsTo(Asset, {
//   foreignKey: "category_name",
//   as: "asset_category",
// });

module.exports = Category;
