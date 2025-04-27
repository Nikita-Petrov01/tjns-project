const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

router.get('/', async (req, res) => {
  const { q } = req.query;
  try {
    const result = await pool.query('SELECT * FROM products WHERE name ILIKE $1', [
      `%${q}%`,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;
