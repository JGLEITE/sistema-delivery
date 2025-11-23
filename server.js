// ======================================================
// server.js - Backend do Sistema de Delivery
// ======================================================

import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------------------------------------
// CONEXÃO COM O BANCO DE DADOS
// ------------------------------------------------------
const db = mysql.createConnection({
  host: "localhost",      // endereço do seu MySQL
  user: "root",           // seu usuário
  password: "Batata.123",           // sua senha
  database: "DeliveryDB", // nome do banco
});

db.connect(err => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("✅ Conectado ao banco DeliveryDB");
  }
});

// ------------------------------------------------------
// ROTAS DA API
// ------------------------------------------------------

// Listar todos os pedidos
app.get("/pedidos", (req, res) => {
  const sql = `
    SELECT p.id_pedido, c.nome AS cliente, r.nome AS restaurante,
           p.data_hora, p.status
    FROM Pedido p
    JOIN Cliente c ON p.id_cliente = c.id_cliente
    JOIN Restaurante r ON p.id_restaurante = r.id_restaurante
    ORDER BY p.id_pedido DESC;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
});

// Cadastrar novo pedido
app.post("/pedidos", (req, res) => {
  const { id_cliente, id_restaurante, itens } = req.body;

  const sqlPedido = `INSERT INTO Pedido (id_cliente, id_restaurante) VALUES (?, ?)`;
  db.query(sqlPedido, [id_cliente, id_restaurante], (err, result) => {
    if (err) return res.status(500).json({ erro: err });

    const idPedido = result.insertId;

    const sqlItem = `INSERT INTO ItemPedido (id_pedido, descricao, quantidade, preco)
                     VALUES ?`;
    const valores = itens.map(i => [idPedido, i.descricao, i.quantidade, i.preco]);

    db.query(sqlItem, [valores], err2 => {
      if (err2) return res.status(500).json({ erro: err2 });
      res.json({ mensagem: "Pedido cadastrado com sucesso!", id_pedido: idPedido });
    });
  });
});

// ------------------------------------------------------
// INICIAR SERVIDOR
// ------------------------------------------------------
const PORT = 3007;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
