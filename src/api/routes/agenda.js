var express = require('express');
var router = express.Router();
const pool = require('../db/config'); // Certifique-se que 'pool' está funcionando

router.post('/', async (req, res) => {
  const { datetime, userId, serviceId } = req.body;

  console.log('Recebido no backend:', { datetime, userId, serviceId });

  if (!datetime || !userId || !serviceId) {
    console.log('❌ Dados incompletos');
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO agenda (data, id_servico, id_usuario)
       VALUES ($1, $2, $3) RETURNING *`,
      [datetime, serviceId, userId]
    );

    console.log('✅ Agendamento inserido:', resultado.rows[0]);

    res.status(201).json({ message: 'Agendamento criado com sucesso' });
  } catch (err) {
    console.error('❌ Erro ao inserir no banco:', err.message);
    res.status(500).json({ error: 'Erro ao criar agendamento', detalhe: err.message });
  }
});

module.exports = router;
