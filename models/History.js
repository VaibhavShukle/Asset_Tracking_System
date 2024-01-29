const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const History = sequelize.define(
  "History",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    asset_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    event: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    field: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    changedFrom: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    changedTo: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    tableName: "history",
    timestamps: false,
  }
);

module.exports = History;
