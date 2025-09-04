-- Ordem reversa para evitar erros de chave estrangeira
DROP TABLE IF EXISTS item_pedido;
DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS produto;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS pet;
DROP TABLE IF EXISTS adm;
-- Tabela de usuários
CREATE TABLE usuario (
    id BIGINT GENERATED ALWAYS AS PRIMARY KEY,
    nome TEXT NOT NULL,
    usuario TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    telefone TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela do Pet
CREATE TABLE pet(
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL,
    id INTEGER NOT NULL,
    FOREIGN KEY (id) REFERENCES usuario(id)
    );

-- Tabela do Administrador
CREATE TABLE adm(
    id_adm INTEGER PRIMARY KEY,
    email INTEGER NOT NULL,
    senha INTEGER NOT NULL
    );

-- Tabela de categorias de produtos
CREATE TABLE categoria (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE
);

-- Tabela de produtos
CREATE TABLE produto (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco NUMERIC(10, 2) NOT NULL CHECK (preco >= 0),
    estoque INT DEFAULT 0 CHECK (estoque >= 0),
    imagem_url TEXT,
    categoria_id BIGINT REFERENCES categoria(id) ON DELETE SET NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


