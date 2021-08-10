"use strict";
const host = require("./lib/getIp.js")(true);
const PORT = process.env.PORT || 5050;

module.exports = {
	host,
	PORT
}