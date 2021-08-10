"use strict";
//Get all packages and configuration files
const express = require('express');
const {host, PORT} = require('./config.js');
const { mySendFile } = require('./controllers/controll.js')
const path = require('path');

const app = express();
//app configurations

app.use( express.static(path.join(__dirname, 'assets')) );

//app routes

mySendFile('/',)

app.get('/login', (req, res)=>{
	res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

//start server

app.listen(PORT, function() {
	console.log(`http://${host}:${PORT}`);
})