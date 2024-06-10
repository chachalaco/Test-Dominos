// Redirige al usuario para que inicie sesion si no esta autentificado
function checkLogin() {
    if (getLoggedUser()) {
        window.location.href = "SelecNivel.html";
    }
}

// Verifica si el usuario esta logeado, si no lo esta redirige hacia el login
function verifyLogin() {
    if (!getLoggedUser()) {
        window.location.href = "index.html";
    }
}

/**
 *
 * @param {String} _nombre
 *
 * @returns {boolean}
 */
function login(_nombre) {
    const users = getUsers();
    const usuario = users.find((u) => u.nombre == _nombre);
    if (!usuario) {
        return false;
    }
    setLoggedUser(usuario);

    return true;
}

/**
 * @param {String} _nombre
 * @param {String} _inicial
 * @param {String} _fechaNac
 * @returns {boolean}
 */
function register(_nombre, _inicial, _fechaNac) {
    if (saveUser(_nombre, _inicial, _fechaNac)) {
        return login(_nombre);
    }
    return false;
}

function logout() {
    localStorage.removeItem("user");
}

/**
 * @returns {{usuario: { nombre: String, usuario: String, fechaNacimiento: String }, partidas: Array<{dificultad: String, intentos: number, finish: boolean, puntaje: number, resultado: Array<number>}>}|null}
 */
function getLoggedUser() {
    return JSON.parse(localStorage.getItem("user"));
}

/**
 * @param {{ nombre: String, usuario: String, fechaNacimiento: String }} _user
 */
function setLoggedUser(_user) {
    const user = { usuario: _user, partidas: [] };
    localStorage.setItem("user", JSON.stringify(user));
}

/**
 * @param {{usuario: { nombre: String, usuario: String, fechaNacimiento: String }, partidas: Array<{dificultad: String, intentos: number, finish: boolean, puntaje: number, resultado: Array<number>}>}} _userdata
 */
function setLoggedUserData(_userdata) {
    localStorage.setItem("user", JSON.stringify(_userdata));
}

/**
 * @returns {Array<{ nombre: String, usuario: String, fechaNacimiento: String }>}
 */
function getUsers() {
    return JSON.parse(localStorage.getItem("users") ?? "[]");
}

/**
 * @param {String} _nombre
 * @param {String} _usuario
 * @param {String} fechaNac
 *
 * @returns {boolean}
 */
function saveUser(_nombre, _inicial, fechaNac) {
    const users = getUsers();
    if (users.find((u) => u.nombre == _nombre)) {
        return false;
    }
    users.push({ nombre: _nombre, usuario: _inicial, fechaNacimiento: fechaNac });
    localStorage.setItem("users", JSON.stringify(users));

    return true;
}

/**
 * @param {String} _usuario
 */
function removeUser(_usuario) {
    const users = ge
    const index = users.findIndex((u) => u.usuario == _usuario);
    if (index >= 0) {
        users.splice(index);
        localStorage.setItem("users", JSON.stringify(users));
    }
}
// console.log(getUsers());
