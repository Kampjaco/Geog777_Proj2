const express = require('express');
const app = express();
const routes = require('./routes/rides');
const pool = require('./db/connection')
require('dotenv').config();

const PORT = process.env.PORT;

///Middleware
app.use(express.json());
app.use('/get_rides', routes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
