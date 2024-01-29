const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const AssetType = sequelize.define('AssetType', {
    assetType_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    asset_types: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status :{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"active"
    }
}, {
    tableName: 'assets_type',
    timestamps: false
});

module.exports = AssetType;
