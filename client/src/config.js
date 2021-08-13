"use strict";
import getIPAddress from "./lib/getIp.js";
import process from 'process';

const PORT = process.env.PORT || 5050;
const host = getIPAddress(true);

export{
	host,
	PORT
}