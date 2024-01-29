const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
  "User",
  {
    u_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    u_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    u_empid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    u_phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    u_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // location_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    location_id: {
      type: DataTypes.INTEGER, // Assuming category_id is an integer
      allowNull: false,
      references: {
        model: "location", // Name of the referenced table
        key: "location_id", // Name of the referenced column
      },
    },

    // dept_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    dept_id: {
      type: DataTypes.INTEGER, // Assuming category_id is an integer
      allowNull: false,
      references: {
        model: "department", // Name of the referenced table
        key: "dept_id", // Name of the referenced column
      },
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1",
    },
  },
  {
    tableName: "user_details",
    timestamps: false,
  }
);

module.exports = User;
