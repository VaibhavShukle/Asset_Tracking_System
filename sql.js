const mysql = require('mysql')


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ams"
})

con.connect(function (err) {
    if (err) {
        console.log("Error in connection")
    } else {
        console.log("connected");
    }
})


module.exports = con;