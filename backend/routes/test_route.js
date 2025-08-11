const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// POST new wait time for a dining location
router.post('/wait_time', async (req, res) => {
  console.log(req);
  const { diningId, waitTime } = req.body;

  console.log(diningId)
  console.log(waitTime)
  

  if (!waitTime || isNaN(waitTime) || waitTime < 0) {
    return res.status(400).json({ error: 'Invalid waitTime' });
  }

  try {
    const query = `
      INSERT INTO wait_times (ride_id, dining_id, waitTime, created_at)
      VALUES (NULL, ${diningId}, ${waitTime}, NOW())
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [diningId, waitTime]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting dining wait time:', err);
    res.status(500).json({ error: 'Failed to insert dining wait time' });
  }
});

module.exports = router;