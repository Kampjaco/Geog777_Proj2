const express = require('express');
const app = express();
const path = require('path');
const pool = require('./db/connection');
const cors = require('cors');
require('dotenv').config();


const ridesRoutes = require('./routes/rides');

const PORT = process.env.PORT || 3000;

///Middleware
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(cors({
  origin: 'https://geog777-proj2-frontend.onrender.com'  // restrict to your frontend domain
}));

app.use(express.json());
app.use('/api/rides', ridesRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
