const mysql = require('mysql');

var dbConnect = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "informatics-system",
    //delsa_db informatics-system
    // multipleStatements: true
});

dbConnect.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = dbConnect;