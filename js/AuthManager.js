const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const logoutBtn = document.getElementById("logoutBtn");

loginForm?.addEventListener("submit", loginEvent);
registerForm?.addEventListener("submit", registerEvent);
logoutBtn?.addEventListener("click", logoutEvent);

function loginEvent(event) {
  event.preventDefault();
  let userInput = loginForm.querySelector("#usuario");
  if (login(userInput.value)) {
    alert("¡Bienvenido!");
    checkLogin();
  } else {
    alert("¡Usuario no registrado!");
  }
}

function registerEvent(event) {
  event.preventDefault();
  let userInput = registerForm.querySelector("#nombre");
  let inicialInput = registerForm.querySelector("#inicial");
  let fechaInput = registerForm.querySelector("#fecha");

  if (register(userInput.value, inicialInput.value, fechaInput.value)) {
    alert("¡Cuenta registrado!");
    checkLogin();
  } else {
    alert("¡Ya existe una cuenta con este nombre!");
  }
}

function logoutEvent(event) {
    logout();
    verifyLogin();
}