const logButton = document.querySelector('.logButton');
const passInput = document.querySelector('.passInput');
const openPass = document.querySelector('.openPass');

;(() => {
	openPass.addEventListener('click', (event) => {
		if(passInput.type === 'password' && openPass.textContent === '-' ){
			passInput.type = 'text';
			openPass.textContent = 'O'
		}else if(passInput.type === 'text' && openPass.textContent === 'O' ){
			passInput.type = 'password';
			openPass.textContent = '-'
		};
	});
})();