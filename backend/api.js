const express = require('express');
const app = express();
const routes = require('./routes');
const pool = require('./db')
require('dotenv').config();

const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.json());
app.use('/', routes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
