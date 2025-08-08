const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// router.get('/', (req, res) => {
//   res.send('Backend is working!');
/// });

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * from rides');
    console.log(result)
    res.send(`Backend and DB connected: ${result.rows[0].now}`);
  } catch (err) {
    console.log(result);
    console.log(err);
    res.status(500).send('Database connection failed');
  }
});

module.exports = router;