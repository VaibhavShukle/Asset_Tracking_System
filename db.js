const mysql = require("mysql");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ams", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

async function init() {
  try {
    await sequelize.authenticate();
    console.log("connect successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
init();

module.exports = sequelize;
