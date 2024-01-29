const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Main_Status = require("./Main_Status");

const Maintenance = sequelize.define(
  "Maintenance",
  {
    main_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    asset_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    main_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    main_details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    main_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    main_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mainStatus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Main_Status, // Use the model
        key: "mainStatus_id",
      },
    },
    main_complete: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    main_cost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    main_warranty: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "maintenance",
    timestamps: false,
  }
);

Maintenance.belongsTo(Main_Status, {
  foreignKey: "mainStatus_id",
  as: "status",
  targetKey: "mainStatus_id",
});

module.exports = Maintenance;
