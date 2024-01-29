const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Document = sequelize.define(
  "Document",
  {
    doc_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    asset_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    doc_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    document: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    doc_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "document",
    timestamps: false,
  }
);

module.exports = Document;
