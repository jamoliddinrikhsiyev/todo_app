
function checkToken(){
	if(!window.localStorage.token){
		window.location.href = "/login"
	}
};

checkToken();