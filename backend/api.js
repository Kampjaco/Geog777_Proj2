const express = require('express');
const app = express();
const ridesRoutes = require('./routes/rides');
const pool = require('./db/connection')
require('dotenv').config();

const PORT = process.env.PORT || 3000;

///Middleware
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());
app.use('/api/rides', ridesRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
