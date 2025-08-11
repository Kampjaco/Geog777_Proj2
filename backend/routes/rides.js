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
          'geometry', ST_AsGeoJSON(ST_Transform(r.geom, 4326))::jsonb,
          'properties', jsonb_build_object(
            'ride_id', r.id,
            'name', r.name,
            'ride_type', rt.description,
            'min_alone_height', r.min_alone_height,
			'min_accomp_height', r.min_accomp_height,
			'section', s.name,
			'uses_fastlane', yn.description,
			'avg_thrill_rating', ROUND(AVG(tr.thrill_lvl)::numeric, 1),
			'avg_wait_time', ROUND(AVG(w.wait_time)::numeric, 1)
			
          )
        ) AS feature
        FROM rides r JOIN ride_type rt ON r.type = rt.id
					JOIN yes_no yn ON r.uses_fastlane = yn.id
					JOIN sections s ON ST_Contains(s.geom, r.geom)
					LEFT JOIN thrill_ratings tr ON tr.ride_id = r.id
					LEFT JOIN wait_times w ON w.ride_id = r.id
					GROUP BY r.id, r.name, rt.description, yn.description, s.name, r.geom
										
      ) AS features;
      `;

      const { rows } = await pool.query(query);

      //Return the GeoJSON FeatureCollection
      res.json(rows[0].jsonb_build_object);
  } catch (err) {
    console.error('Error fetching rides GeoJSON:', err);
    res.status(500).send('Failed to fetch rides data');
  }
});

module.exports = router;