-- Ordem reversa para evitar erros de chave estrangeira
DROP TABLE IF EXISTS servicos;
DROP TABLE IF EXISTS agenda;
DROP TABLE IF EXISTS item_pedido;
DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS produto;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS pet;
DROP TABLE IF EXISTS adm;

-- Tabela de usuários
CREATE TABLE usuario (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    imagem_url TEXT,
    nome TEXT NOT NULL,
    usuario TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    telefone TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN
);

CREATE TABLE servicos(
    id_servico INTEGER NOT NULL PRIMARY KEY,
    tipo_servico TEXT NOT NULL
);

CREATE TABLE agenda (
    id_agenda BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    data TIMESTAMP NOT NULL,
    id_servico INTEGER,
    id_usuario BIGINT,
    FOREIGN KEY (id_servico) REFERENCES servicos(id_servico),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);


-- Tabela do Pet
CREATE TABLE pet(
    id_pet INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL
    );

-- Tabela de categorias de produtos
CREATE TABLE categoria(
    id_categoria INTEGER PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE
);

-- Tabela de produtos
CREATE TABLE produto(
    id_produto BIGINT GENERATED ALWAYS AS IDENTITY,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco NUMERIC(10, 2) NOT NULL CHECK (preco >= 0),
    estoque INT DEFAULT 0 CHECK (estoque >= 0),
    imagem_url TEXT,
    categoria_id BIGINT REFERENCES categoria(id_categoria) ON DELETE SET NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE adm (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id BIGINT NOT NULL UNIQUE REFERENCES usuario(id) ON DELETE CASCADE,
    data_promocao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO servicos(id_servico, tipo_servico) VALUES
('1', 'banho' ),
('2', 'tosa' ),
('3', 'banho e tosa');

INSERT INTO categoria(id_categoria, nome) VALUES
('1', 'brinquedo'),
('2', 'petisco'),
('3', 'acessorio')

INSERT INTO usuario (imagem_url, nome, usuario, email, senha, telefone, is_admin) VALUES
-- senha efelantinho
(NULL, 'hermenegildo', 'hermenegildo','hermenegildo@email.com', '12345678', '12345678' ,'TRUE'),
(NULL, 'zoroastra', 'zoroastra' ,'zoroastra@email.com', '12345678', '12345678' ,'FALSE');

SELECT * FROM servicos;


SELECT * FROM usuario;
