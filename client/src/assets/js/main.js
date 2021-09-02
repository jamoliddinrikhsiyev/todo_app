const head = document.querySelector('h1');
let nick = window.localStorage.getItem("name")

function checkToken(){
	if(!window.localStorage.token){
		window.location.href = "/login"
	}
};

checkToken();

head.textContent = `Hello ${head}`