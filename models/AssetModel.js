const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const AssetModel = sequelize.define('AssetModel', {
    model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    model_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    model_assetType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status :{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"active"
    }
}, {
    tableName: 'model',
    timestamps: false
});

module.exports = AssetModel;
