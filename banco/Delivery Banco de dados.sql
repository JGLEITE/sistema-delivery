-- ======================================================
-- BANCO DE DADOS - SISTEMA DE DELIVERY
-- ======================================================

CREATE DATABASE IF NOT EXISTS deliverydb;
USE deliverydb;

-- ==========================
-- Tabela de Clientes
-- ==========================
CREATE TABLE IF NOT EXISTS Cliente (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  endereco VARCHAR(150)
);

-- ==========================
-- Tabela de Restaurantes
-- ==========================
CREATE TABLE IF NOT EXISTS Restaurante (
  id_restaurante INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  tipo_cozinha VARCHAR(50),
  telefone VARCHAR(20)
);

-- ==========================
-- Tabela de Pedidos
-- ==========================
CREATE TABLE IF NOT EXISTS Pedido (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  id_restaurante INT NOT NULL,
  data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Em preparo', 'A caminho', 'Entregue') DEFAULT 'Em preparo',
  FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
  FOREIGN KEY (id_restaurante) REFERENCES Restaurante(id_restaurante)
);

-- ==========================
-- Tabela de Itens do Pedido
-- ==========================
CREATE TABLE IF NOT EXISTS ItemPedido (
  id_item INT AUTO_INCREMENT PRIMARY KEY,
  id_pedido INT NOT NULL,
  descricao VARCHAR(100),
  quantidade INT DEFAULT 1,
  preco DECIMAL(10,2),
  FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido)
);

-- ==========================
-- Inserção de dados de teste
-- ==========================
INSERT INTO Cliente (nome, telefone, endereco) VALUES
('Guilherme', '99999-9999', 'Rua Central, 123'),
('Gabriel', '98888-8888', 'Av. das Palmeiras, 45');

INSERT INTO Restaurante (nome, tipo_cozinha, telefone) VALUES
('Restaurante do Chef', 'Italiana', '97777-7777'),
('Sabor Caseiro', 'Brasileira', '96666-6666');

INSERT INTO Pedido (id_cliente, id_restaurante, status)
VALUES (8, 6, 'Em preparo');

INSERT INTO ItemPedido (id_pedido, descricao, quantidade, preco)
VALUES (1, 'Pizza de Calabresa', 2, 39.90),
       (1, 'Refrigerante 2L', 1, 10.00);


-- Novo cliente
INSERT INTO Cliente (nome, telefone, endereco)
VALUES ('Nobre', '99999-8888', 'Rua Bill, 5512');

-- Novo restaurante
INSERT INTO Restaurante (nome, tipo_cozinha, telefone)
VALUES ('McDonalds', 'Fast Food', '4002-8922');

-- Novo pedido (ligando cliente e restaurante)
INSERT INTO Pedido (id_cliente, id_restaurante, status)
VALUES (1, 1, 'Em preparo');

-- Itens do pedido
INSERT INTO ItemPedido (id_pedido, descricao, quantidade, preco)
VALUES 
(1, 'Big Mac', 2, 25.90),
(1, 'Batata Grande', 1, 12.50),
(1, 'Coca-Cola 1L', 1, 9.00);


SELECT * FROM pedido;
SELECT * FROM itempedido;
SELECT * FROM restaurante;
SELECT * FROM cliente;