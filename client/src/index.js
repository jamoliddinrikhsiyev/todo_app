"use strict";
//Get all packages and configuration files
import express from 'express';
import cors from 'cors';
import {host, PORT} from './config.js';
import { mySendFile } from './controllers/controll.js'
import path from 'path';
const __dirname = path.resolve("./");

const app = express();
//app configurations

app.use( express.static(path.join(__dirname, 'src', 'assets')) );
app.use( cors() )

//app routes

app.get( '/', mySendFile(path.join(__dirname, 'src', 'views', 'index.html') ) );

app.get( '/login', mySendFile(path.join(__dirname,'src', 'views', 'login.html') ) );

//start server

app.listen(PORT, function() {
	console.log(`http://${host}:${PORT}`);
})