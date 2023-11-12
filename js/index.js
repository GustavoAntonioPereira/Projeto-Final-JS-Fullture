let listaTarefas = [];

const campoInput = document.querySelector(".todo-input");
campoInput.id = "meuCampoInput";

const input = document.getElementById("meuCampoInput");
const btnAdd = document.querySelector(".todo-button");
const ulTarefas = document.querySelector(".todo-list");
const selectFiltro = document.querySelector(".filter-todo");

// Evento ao adicionar uma tarefa
btnAdd.addEventListener("click", function (evento) {
    evento.preventDefault();

    if (input.value === "") {
        alert("Oops! Você esqueceu de digitar a tarefa.\nPor favor, insira uma tarefa antes de adicionar.");
        return;
    } else {
        const objTarefa = {
            id: `${Date.now()}`,
            textoTarefa: input.value,
            status: "uncompleted",
        };

        // Adicionar a nova tarefa à listaTarefas do usuário logado
        listaTarefas.push(objTarefa);  // Adicione a nova tarefa à listaTarefas antes de salvar no localStorage

        // Salvar a listaTarefas atualizada no localStorage
        localStorage.setItem("tarefas", JSON.stringify(listaTarefas));

        // Atualizar o DOM
        atualizarDom();
    }
});


// Função para criar uma tarefa
function criarTarefa(tarefa) {
    let liTarefas = document.createElement("li");
    liTarefas.classList.add("todo-item");
    liTarefas.innerHTML = tarefa.textoTarefa;

    let btnFinalizar = document.createElement("button");
    btnFinalizar.classList.add("check-btn");
    let iconeFinalizar = document.createElement("i");
    iconeFinalizar.classList.add("fas", "fa-check");
    btnFinalizar.appendChild(iconeFinalizar);

    let btnRemover = document.createElement("button");
    btnRemover.classList.add("trash-btn");
    let iconeRemover = document.createElement("i");
    iconeRemover.classList.add("fas", "fa-trash");
    btnRemover.appendChild(iconeRemover);

    let divTarefa = document.createElement("div");
    divTarefa.classList.add("todo");
    divTarefa.append(liTarefas, btnFinalizar, btnRemover);

    btnRemover.addEventListener("click", function () {
        removerTarefa(tarefa.id, tarefa.textoTarefa);
    });

    btnFinalizar.addEventListener("click", function () {
        finalizarTarefa(tarefa.id);
    });

    if (tarefa.status === "completed") {
        liTarefas.classList.add("completed");
    }

    return divTarefa;

}

// Função para atualizar o DOM
function atualizarDom() {
    ulTarefas.innerHTML = "";

    const opcaoSelecionada = selectFiltro.value;
    const listaTarefasFiltradas = listaTarefas.filter(function (tarefa) {
        if (opcaoSelecionada === "all") {
            return true;
        } else if (opcaoSelecionada === "completed") {
            return tarefa.status === "completed";
        } else if (opcaoSelecionada === "uncompleted") {
            return tarefa.status === "uncompleted";
        }
    });

    for (let i = 0; i < listaTarefasFiltradas.length; i++) {
        const tarefa = listaTarefasFiltradas[i];
        const divTarefa = criarTarefa(tarefa);
        ulTarefas.appendChild(divTarefa);
    }
    campoInput.value = "";
}


// Função para finalizar uma tarefa
function finalizarTarefa(id) {
    const tarefa = listaTarefas.find(function (tarefaClicada) {
        return tarefaClicada.id === id;
    });

    if (tarefa) {
        tarefa.status = (tarefa.status === "completed") ? "uncompleted" : "completed";
        localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
        atualizarDom();
    }
}

// Função para remover uma tarefa
function removerTarefa(id) {
    const confirmado = confirm("Deseja remover a tarefa?");
    if (!confirmado) {
        return;
    }

    listaTarefas = listaTarefas.filter(function (tarefa) {
        return tarefa.id !== id;
    });
    localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
    atualizarDom();
}

// Evento ao mudar o filtro
selectFiltro.addEventListener("change", atualizarDom);

// Carregar tarefas do usuário logado ao iniciar a página
window.addEventListener("load", function () {
    if (this.sessionStorage.getItem("logged")) {
      listaTarefas = JSON.parse(this.localStorage.getItem("tarefas") || "[]");
      atualizarDom();
    } else {
        alert("Você precisa estar logado para acessar essa página");
        window.location.href = "./login.html";
    }

    atualizarDom();
});
