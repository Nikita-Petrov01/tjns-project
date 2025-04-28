const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
// const { Products } = require('../../db/models');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

router.get('/', async (req, res) => {
  const { q } = req.query;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM public.products WHERE name ILIKE $1',
      [`%${q}%`],
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Ошибка сервера${error.message}`);
  }
});

module.exports = router;
