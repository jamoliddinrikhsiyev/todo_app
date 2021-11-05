"use strict";
const host = require("./lib/getIp.js")(false);
const { Pool } = require("pg");
const PORT = process.env.PORT || 4000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todoapp",
  password: "1111",
  port: 5432,
});

module.exports = {
  host,
  PORT,
  pool,
};
