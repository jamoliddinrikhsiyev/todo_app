'use strict'

function mySendFile(rt, pth){
	app.get(rt, (req, res)=>{
		res.sendFile(pth)
	})
}

module.exports = {
	mySendFile
}