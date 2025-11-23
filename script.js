// ======================================================
// script.js - integração real com o backend (MySQL)
// ======================================================

// ------------------------------------------------------
// Função para carregar pedidos do banco
// ------------------------------------------------------
async function atualizarTabela() {
  const tbody = document.querySelector("#tabelaPedidos tbody");
  tbody.innerHTML = "";

  try {
    const resposta = await fetch("http://localhost:3007/pedidos");
    const pedidos = await resposta.json();

    pedidos.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.id_pedido}</td>
        <td>${p.cliente}</td>
        <td>${p.restaurante}</td>
        <td>${new Date(p.data_hora).toLocaleString()}</td>
        <td>${p.status}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (erro) {
    console.error("Erro ao buscar pedidos:", erro);
  }
}

// ------------------------------------------------------
// Função para cadastrar um novo pedido
// ------------------------------------------------------
document.querySelector("#formPedido").addEventListener("submit", async e => {
  e.preventDefault();

  const cliente = document.querySelector("#cliente").value.trim();
  const restaurante = document.querySelector("#restaurante").value.trim();
  const itensTexto = document.querySelector("#itens").value.trim();

  if (!cliente || !restaurante || !itensTexto) {
    alert("Preencha todos os campos!");
    return;
  }

  // Exemplo: Pizza Calabresa,2,39.90
  const itens = itensTexto.split("\n").map(linha => {
    const [descricao, quantidade, preco] = linha.split(",");
    return { descricao, quantidade: Number(quantidade), preco: Number(preco) };
  });

  // OBS: idealmente, você buscaria o id_cliente e id_restaurante do banco
  const pedido = {
    id_cliente: Number(cliente),      // aqui deve ser o ID real (ex: 1)
    id_restaurante: Number(restaurante), // idem
    itens
  };

  try {
    const resposta = await fetch("http://localhost:3007/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido)
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert("✅ " + dados.mensagem);
      atualizarTabela();
      e.target.reset();
    } else {
  alert("❌ Erro: " + (dados.erro?.message || JSON.stringify(dados.erro)));

    }
  } catch (erro) {
    console.error("Erro ao cadastrar pedido:", erro);
    alert("❌ Erro ao enviar pedido para o servidor!");
  }
});

// ------------------------------------------------------
// Inicializa tabela ao abrir a página
// ------------------------------------------------------
document.addEventListener("DOMContentLoaded", atualizarTabela);
