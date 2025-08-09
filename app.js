let amigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nomeAmigo = inputAmigo.value.trim();

    if (nomeAmigo === "") {
        alert("Digite um nome válido.");
        return;
    }

    if (amigos.includes(nomeAmigo)) {
        alert("Este nome já foi adicionado.");
        return;
    }

    amigos.push(nomeAmigo);
    atualizarLista();
    inputAmigo.value = "";
}

// Função para atualizar a lista de amigos na tela
function atualizarLista() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        // Botão para remover amigo da lista
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "❌";
        botaoRemover.onclick = () => removerAmigo(index);
        botaoRemover.style.marginLeft = "10px";
        botaoRemover.style.cursor = "pointer";
        
        li.appendChild(botaoRemover);
        listaAmigos.appendChild(li);
    });
}

// Função para remover um amigo da lista
function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

// Função para sortear os amigos secretamente
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("É necessário pelo menos 2 participantes para o sorteio.");
        return;
    }

    let sorteio = [];
    let disponiveis = [...amigos];

    amigos.forEach((amigo) => {
        let possiveis = disponiveis.filter((pessoa) => pessoa !== amigo);

        if (possiveis.length === 0) {
            alert("Erro no sorteio. Tente novamente.");
            return;
        }

        let sorteado = possiveis[Math.floor(Math.random() * possiveis.length)];
        sorteio.push({ amigo, sorteado });

        // Remove o sorteado da lista de disponíveis
        disponiveis = disponiveis.filter((pessoa) => pessoa !== sorteado);
    });

    exibirResultado(sorteio);
}

// Função para exibir o resultado do sorteio na tela
function exibirResultado(sorteio) {
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = "";

    sorteio.forEach((par) => {
        const li = document.createElement("li");
        li.textContent = `${par.amigo} → ${par.sorteado}`;
        listaResultado.appendChild(li);
    });
}
