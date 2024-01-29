const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Location = sequelize.define('Location', {
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    location_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location_desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status :{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:"1"
    }
}, {
    tableName: 'location',
    timestamps: false
});

module.exports = Location;
