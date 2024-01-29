// const { DataTypes } = require("sequelize");
// const sequelize = require("../db");
// const Condition = require("./Condition");
// const Location = require("./Location");
// const User = require("./User");
// const AssetBrand = require("./AssetBrand");

// const Asset = sequelize.define(
//   "Asset",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     asset_id: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     asset_category: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     asset_subCategory: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     asset_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     // asset_type: {
//     //   type: DataTypes.STRING,
//     //   allowNull: false,
//     // },
//     asset_brand: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     asset_model: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     asset_location: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     asset_purchaseDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     asset_Cost: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     // accu_status: {
//     //   type: DataTypes.INTEGER,
//     //   allowNull: true,
//     // },
//     asset_owner: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     asset_vendorInfo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     asset_serialNumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     asset_condition: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     asset_image: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     depreciation_id: {
//       type: DataTypes.INTEGER, // Assuming category_id is an integer
//       allowNull: false,
//       references: {
//         model: "depreciation", // Name of the referenced table
//         key: "depreciation_id", // Name of the referenced column
//       },
//     },
//   },
//   {
//     tableName: "assets",
//     timestamps: false,
//   }
// );

// Asset.belongsTo(Condition, {
//   foreignKey: "asset_condition",
//   as: "condition",
// });

// Asset.belongsTo(Location, {
//   foreignKey: "asset_location",
//   as: "location_name",
// });

// Asset.belongsTo(AssetBrand, {
//   foreignKey: "asset_brand",
//   as: "brand_name",
// });

// module.exports = Asset;

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Condition = require("./Condition");
const Location = require("./Location");
const User = require("./User");
const Category = require("./Category");

const Asset = sequelize.define(
  "Asset",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    asset_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asset_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    asset_subCategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    asset_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    asset_brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asset_model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asset_location: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    asset_department: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    asset_purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    asset_Cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    depreciation_percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    asset_life: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // accu_status: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    asset_owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asset_vendorInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asset_serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    asset_condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asset_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "assets",
    timestamps: false,
  }
);

Asset.belongsTo(Condition, {
  foreignKey: "asset_condition",
  as: "condition",
});

Asset.belongsTo(Location, {
  foreignKey: "asset_location",
  as: "location_name",
});

// Asset.belongsTo(Category, {
//   foreignKey: "category_name",
//   as: "asset_category",
// });

module.exports = Asset;
