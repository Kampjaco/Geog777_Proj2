const express = require('express');
const app = express();
const path = require('path');
const pool = require('./db/connection');
const cors = require('cors');
require('dotenv').config();


const ridesRoutes = require('./routes/rides');
const diningRoutes = require('./routes/dining');
const PORT = process.env.PORT || 3000;

//Allows for backend calls from frontend URL
app.use(cors({
  origin: 'https://geog777-proj2-frontend.onrender.com'
}));

///Middleware
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(express.json());
app.use('/api/rides', ridesRoutes);
app.use('/api/dining', diningRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
