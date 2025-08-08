const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// router.get('/', (req, res) => {
//   res.send('Backend is working!');
/// });

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * from rides');
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Database connection failed');
  }
});

module.exports = router;