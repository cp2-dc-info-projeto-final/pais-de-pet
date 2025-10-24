var express = require('express');
var router = express.Router();
var pool = require('../db/config'); // usa o arquivo configs.js

// ===============================
// Criar novo agendamento
// ===============================

router.get("/servicos", async (req, res) => {
  try {
    const result = await pool.query("SELECT id_servico, tipo_servico FROM servicos");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao carregar serviços" });
  }
});


router.post('/', async function (req, res) {
  const { datetime, userId, serviceId } = req.body;

  if (!datetime || !userId || !serviceId) {
    return res.status(400).json({ erro: 'Dados incompletos para o agendamento.' });
  }

  try {
    // Verifica se o horário já está ocupado
    const verifica = await pool.query(
      'SELECT * FROM agenda WHERE data = $1 AND id_servico = $2',
      [datetime, serviceId]
    );

    if (verifica.rows.length > 0) {
      return res.status(400).json({ erro: 'Horário já agendado.' });
    }

    await pool.query(
      'INSERT INTO agenda (data, id_usuario, id_servico) VALUES ($1, $2, $3)',
      [datetime, userId, serviceId]
    );

    res.status(201).json({ mensagem: 'Agendamento criado com sucesso!' });
  } catch (err) {
    console.error('Erro ao criar agendamento:', err);
    res.status(500).json({ erro: 'Erro ao criar agendamento.' });
  }
});

// ===============================
// Listar agendamentos do usuário
// ===============================
router.get('/:userId', async function (req, res) {
  const { userId } = req.params;

  try {
    const resultado = await pool.query(
      `SELECT a.id_agenda, a.data, s.tipo_servico
       FROM agenda a
       JOIN servicos s ON a.id_servico = s.id_servico
       WHERE a.id_usuario = $1
       ORDER BY a.data ASC`,
      [userId]
    );

    res.json(resultado.rows);
  } catch (err) {
    console.error('Erro ao buscar agendamentos:', err);
    res.status(500).json({ erro: 'Erro ao buscar agendamentos.' });
  }
});

// ===============================
// Cancelar (deletar) um agendamento
// ===============================
router.delete('/:id_agenda', async function (req, res) {
  const { id_agenda } = req.params;

  try {
    await pool.query('DELETE FROM agenda WHERE id_agenda = $1', [id_agenda]);
    res.sendStatus(204);
  } catch (err) {
    console.error('Erro ao cancelar agendamento:', err);
    res.status(500).json({ erro: 'Erro ao cancelar agendamento.' });
  }
});

module.exports = router;
