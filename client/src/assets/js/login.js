const logButton = document.querySelector(".logButton");
const form = document.querySelector(".form");
const passInput = document.querySelector(".passInput");
const logInput = document.querySelector(".logInput");
const openPass = document.querySelector(".openPass");
const regSelect = document.querySelector(".regSelect");
const loginSelect = document.querySelector(".loginSelect");

(() => {
  openPass.addEventListener("click", (event) => {
    if (passInput.type === "password" && openPass.textContent === "-") {
      passInput.type = "text";
      openPass.textContent = "O";
    } else if (passInput.type === "text" && openPass.textContent === "O") {
      passInput.type = "password";
      openPass.textContent = "-";
    }
  });

  loginSelect.addEventListener("click", (event) => {
    if (!loginSelect.classList.value.includes("selected")) {
      regSelect.classList.remove("selected");
      loginSelect.classList.add("selected");
    }
  });

  regSelect.addEventListener("click", (event) => {
    if (!regSelect.classList.value.includes("selected")) {
      loginSelect.classList.remove("selected");
      regSelect.classList.add("selected");
    }
  });
})();

let query = `
	mutation adduser($user: String!, $password: String!, $status: String){
		newUser(username: $user, password: $password, status: $status){
			token
		}
	}
`;

async function fetchData(username, password, status) {
  let response = await fetch(`http://${host}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { user: username, password, status },
    }),
  });
  return await response.json();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  window.localStorage.setItem("username", logInput.value);
  let s;
  if (
    !regSelect.classList.value.includes("selected") &&
    loginSelect.classList.value.includes("selected")
  ) {
    s = "login";
  } else {
    s = "create";
  }
  fetchData(logInput.value, passInput.value, s).then((data) => {
    if (data.data.newUser) {
      window.localStorage.setItem("token", data.data.newUser.token);
      window.location.href = "/";
    } else {
      alert("The username or password wrong");
    }
  });
});
