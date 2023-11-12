let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#pass')

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})
function login() {

    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    let listaUsers = JSON.parse(localStorage.getItem("users") || "[]");
    let logged = listaUsers.find(
        (item) => item.user == user && item.pass == pass
    );
    if (logged) {
        sessionStorage.setItem("logged", true);
        sessionStorage.getItem("logged");
        window.location.href = "./index.html";
    } else {
        alert("Usuário ou senha inválidos");
    }
}

function cadastrar() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    let listaUsers = JSON.parse(localStorage.getItem("users") || "[]");

    listaUsers.push({ user, pass });

    localStorage.setItem("users", JSON.stringify(listaUsers));
}