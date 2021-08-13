'use strict'

function mySendFile(pth){
	return (req, res)=>{
		res.sendFile(pth)
	}
}

export{
	mySendFile
}