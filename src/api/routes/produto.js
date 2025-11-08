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
    result.rows.map(async (produto) => {
      try {
        let imagem_url = await axios.put("http://localhost:3001/images", {
          "path": `uploads/${produto.id}/main.png`
        })
        return {
          ...produto,
          "Image":imagem_url.data.data
        }
      } catch (e) {
        return produto
      }
    })
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* GET parametrizado - Buscar produto por ID */
router.get('/:id_produto', async function(req, res, next) {
  try {
    const { id_produto } = req.params;

    console.log('ID do produto recebido no backend:', id_produto);

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

/* GET - Listar categorias (para debug) */
router.get('/debug/categorias', async function(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM categoria');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* POST - Criar novo produto */
router.post('/', async function (req, res, next) {
  try {
    const { nome, descricao, preco, estoque, imagem_url ,categoria_id } = req.body;

    // Validação básica
    if (!nome || !descricao || !imagem_url || !categoria_id) {
      return res.status(400).json({
        success: false,
        message: 'Nome, descrição, imagem_url e categoria_id são obrigatórios'
      });
    }

    // Verificar se os produtos já existem
    const ProdutosExistes = await pool.query(
      'SELECT id_produto FROM produto WHERE nome = $1',
      [nome]
    );

    if (ProdutosExistes.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Produto já está em uso'
      });
    }

    // Inserir novo produto
    const result = await pool.query(
      `INSERT INTO produto (nome, descricao, preco, estoque, categoria_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id_produto, nome, descricao, preco, estoque, imagem_url, categoria_id, data_cadastro`,
      [nome, descricao, preco, estoque, imagem_url ,categoria_id]
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
router.put('/:id_produto', async function(req, res, next) {
  try {
    console.log('cheguei');
    const { id_produto } = req.params;
    const { nome, preco, estoque, descricao, categoria_id} = req.body;
    
    // Validação básica
    if (!nome || !descricao || !preco || !estoque || imagem_url || !categoria_id) {
      return res.status(400).json({
        success: false,
        message: 'Nome, preco, estoque ,descricao, imagem e categoria são obrigatórios'
      });
    }
    
    // Verificar se o produto é existe
    const result = await pool.query(
      `UPDATE produto 
       SET nome = $1, descricao = $2, preco = $3, estoque = $4, imagem_url = $5 ,categoria_id = $6
       WHERE id_produto = $7 
       RETURNING *`,
      [nome, descricao, preco, estoque, imagem_url ,categoria_id || null, id_produto]
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
router.delete('/:id_produto', async function(req, res, next) {
  try {
    const { id_produto } = req.params;
    
    // Verificar se o produto existe
    const ProdutoExists = await pool.query('SELECT id_produto FROM produto WHERE id_produto = $1', [id_produto]);
    if (ProdutoExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }
    
    await pool.query('DELETE FROM produto WHERE id_produto = $1', [id_produto]);
    try{
      await axios.delete("http://localhost:3001/images", {
  data: {
    path: `uploads/${id_produto}/main.png`
  }
})
    }catch(e){
      console.error(e)
    }
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

module.exports = router;