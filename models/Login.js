const { DataTypes } = require("sequelize");
const sequelize = require("../db");



const Login = sequelize.define('Login', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    tableName:'login',
    timestamps:false
}
)

// To sync the model with the database


module.exports = Login;