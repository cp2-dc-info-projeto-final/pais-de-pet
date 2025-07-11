var express = require('express');
var router = express.Router();
const pool = require('../db/config');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


/* GET - Buscar todos os usuários */
router.get('/', async function(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM usuario ORDER BY id');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* GET parametrizado - Buscar usuário por ID */
router.get('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* POST - Criar novo usuário */
router.post('/', async function (req, res, next) {
  try {
    const { nome, usuario, email, senha, telefone } = req.body;

    // Validação básica
    if (!nome || !usuario || !email || !senha || !telefone) {
      return res.status(400).json({
        success: false,
        message: 'Login, email e senha são obrigatórios'
      });
    }

    // Verificar se o login ou email já existem
    const UsuarioExistes = await pool.query(
      'SELECT id FROM usuario WHERE usuario = $1',
      [usuario]
    );

    if (UsuarioExistes.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Usuario já está em uso'
      });
    }

    const EmailExistes = await pool.query(
      'SELECT id FROM usuario WHERE email = $1',
      [email]
    )

    if (EmailExistes.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email já está em uso'
      });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

    // Inserir novo usuário
    const result = await pool.query(
      `INSERT INTO usuario (nome, usuario, email, senha, telefone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nome, usuario, email, telefone, data_criacao`,
      [nome, usuario, email, hashedPassword, telefone]
    );

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* PUT - Atualizar usuário */
router.put('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    const { login, email } = req.body;
    
    // Validação básica
    if (!login || !email) {
      return res.status(400).json({
        success: false,
        message: 'Login e email são obrigatórios'
      });
    }
    
    // Verificar se o usuário existe
    const userExists = await pool.query('SELECT id FROM usuario WHERE id = $1', [id]);
    if (userExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    const result = await pool.query(
      'UPDATE usuario SET login = $1, email = $2 WHERE id = $3 RETURNING *',
      [login, email, id]
    );
    
    res.json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* DELETE - Remover usuário */
router.delete('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    
    // Verificar se o usuário existe
    const userExists = await pool.query('SELECT id FROM usuario WHERE id = $1', [id]);
    if (userExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
    
    res.json({
      success: true,
      message: 'Usuário deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;