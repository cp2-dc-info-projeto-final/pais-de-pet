var express = require('express');
var router = express.Router();
const pool = require('../db/config');



/* GET - Buscar todos os produtos*/
router.get('/', async function(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM produto ORDER BY id_produto');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* GET parametrizado - Buscar produto por ID */
router.get('/:id', async function(req, res, next) {
  try {
    const { id_produto } = req.params;
    const result = await pool.query('SELECT * FROM produto WHERE id_produto = $1', [id_produto]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* POST - Criar novo produto */
router.post('/', async function (req, res, next) {
  try {
    const { nome, descricao, preco, estoque,} = req.body;

    // Validação básica
    if (!nome || !descricao || !preco || !estoque) {
      return res.status(400).json({
        success: false,
        message: 'Nome, descrição, preço e estoque são obrigatórios'
      });
    }

    // Verificar se o login ou email já existem
    const ProdutosExistes = await pool.query(
      'SELECT id_produto FROM produto WHERE produto = $1',
      [produto]
    );

    if (ProdutosExistes.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Produto já está em uso'
      });
    }

    // Inserir novo produto
    const result = await pool.query(
      `INSERT INTO produto (nome, descricao, preco, estoque)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nome, preco, estoque, categoria_id, data_cadastro`,
      [nome, descricao, preco, estoque]
    );

    res.status(201).json({
      success: true,
      message: 'Produto criado com sucesso',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* PUT - Atualizar produto */
router.put('/:id', async function(req, res, next) {
  try {
    const { id_produto } = req.params;
    const { nome, descricao, preco, estoque} = req.body;
    
    // Validação básica
    if (!nome || !descricao || !preco || !estoque) {
      return res.status(400).json({
        success: false,
        message: 'Nome, preco, e categoria são obrigatórios'
      });
    }
    
    // Verificar se o produto é existe
    const ProdutoExists = await pool.query('SELECT id_produto FROM produto WHERE id_produto = $1', [id_produto]);
    if (ProdutoExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }
    
    const result = await pool.query(
      'UPDATE produto SET nome = $1, id_produto = $2 RETURNING *',
      [nome, id_produto]
    );
    
    res.json({
      success: true,
      message: 'Produto atualizado com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* DELETE - Remover produto */
router.delete('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    
    // Verificar se o produto existe
    const ProdutoExists = await pool.query('SELECT id_produto FROM produto WHERE id_produto = $1', [id_produto]);
    if (ProdutoExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }
    
    await pool.query('DELETE FROM produto WHERE id_produto = $1', [id_produto]);
    
    res.json({
      success: true,
      message: 'Produto deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});


/* POST - Login */
router.post('/adicionar', async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;

    if (!nome || !preco || !estoque) {
      return res.status(400).json({ success: false, message: 'Nome, preco e estoque são obrigatórios' });
    }

    const result = await pool.query('SELECT * FROM produto WHERE nome = $1', [nome]);
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Nome, preco e estoque incorretos' });
    }

    const produto = result.rows[0];
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Email ou senha incorretos' });
    }

    // Retorna dados do usuário sem a senha
    const {...produtoData } = produto;
    res.json({ success: true, data: produtoData });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});


module.exports = router;