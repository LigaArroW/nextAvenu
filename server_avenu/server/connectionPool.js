"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionPool = void 0;
require("dotenv/config");
var mysql = require("mysql");
//const user = "root";
//const password = "root";
//const database = "esco";
//const host = "localhost";
exports.connectionPool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    multipleStatements: true,
});
