const express = require('express');
const app = express();
const routes = require('./routes/index');
const pool = require('./db/connection')
require('dotenv').config();

const PORT = process.env.PORT;

///Middleware
app.use(express.json());
app.use('/', routes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
