const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");
const Condition = require("./Condition");
const Asset = require("./Asset");

const Checkout = sequelize.define(
  "Checkout",
  {
    userAssign_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    asset_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    assign_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    return_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    remark: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    product_condition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "checkout",
    timestamps: false,
  }
);

Checkout.belongsTo(Asset, {
  foreignKey: "asset_id",
  as: "assetName",
  targetKey: "asset_id",
});

Asset.hasOne(Checkout, {
  foreignKey: "asset_id",
  as: "checkout",
  sourceKey: "asset_id",
});

Checkout.belongsTo(Condition, {
  foreignKey: "product_condition",
  as: "condition",
});

Checkout.belongsTo(User, {
  foreignKey: "user_id",
  as: "u_name",
});

// User.hasMany(Checkout, {
//   foreignKey: "asset_id",
//   as: "asset_name",
// });

module.exports = Checkout;
