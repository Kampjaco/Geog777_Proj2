/**
 * This file is a route that dynamically gets GeoJSON data for the dining locations layer
 * It also has a route that uses the dining ID to update wait times for that specific location
 * 
 * Author: Jacob Kampf
 * Last edited: 8/11/2025
 */

const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const query = `
        SELECT jsonb_build_object(
        'type', 'FeatureCollection',
        'features', jsonb_agg(feature)
      )
      FROM (
        SELECT jsonb_build_object(
          'type', 'Feature',
    	  'geometry', ST_AsGeoJSON(ST_Transform(dl.geom, 4326))::jsonb,
          'properties', jsonb_build_object(
            'dining_id', dl.dl_id,
            'name', dl.name,
			'dining_plan', yn.description,
			'snack_plan', yn2.description,
			'section', s.name,
			'avg_wait_time', ROUND(AVG(w.wait_time)::numeric, 1)
			
          )
        ) AS feature
        FROM dining_locations dl JOIN yes_no yn ON dl.dining_plan = yn.id
					JOIN yes_no yn2 ON dl.snack_plan = yn2.id
					JOIN sections s ON ST_Contains(s.geom, dl.geom)
					LEFT JOIN wait_times w ON w.dining_id = dl.dl_id
					GROUP BY dl.dl_id, dl.name, yn.description, yn2.description, s.name, dl.geom
										
      ) AS features;
      `;

      const { rows } = await pool.query(query);

      //Return the GeoJSON FeatureCollection
      res.json(rows[0].jsonb_build_object);
  } catch (err) {
    console.error('Error fetching rides GeoJSON:', err);
    res.status(500).send('Failed to fetch dining location data');
  }
});

// POST new wait time for a dining location
router.post('/wait_time', async (req, res) => {
  const { diningId, waitTime } = req.body;

  console.log(diningId)
  console.log(waitTime)
  

  if (!waitTime || isNaN(waitTime) || waitTime < 0) {
    return res.status(400).json({ error: 'Invalid waitTime' });
  }

  try {
    const query = `
      INSERT INTO waitTimes (ride_id, dining_id, waitTime, created_at)
      VALUES (NULL, $1, $2, NOW())
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [diningId, waitTime]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting dining wait time:', err);
    res.status(500).json({ error: 'Failed to insert dining wait time' });
  }
});

// router.post('/wait_time', (req, res) => {
//   console.log('Headers:', req.headers);
//   console.log('Raw Body:', req.body);
//   res.json({ message: 'Got it' });
// });
module.exports = router;