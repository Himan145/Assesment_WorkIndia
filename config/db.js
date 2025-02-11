const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "pass123",
    database: "workindia",
});

module.exports = pool.promise();
