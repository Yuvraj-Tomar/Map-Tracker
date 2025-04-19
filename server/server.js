require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mapRoutes = require('./routes/mapRoutes');

const app = express();


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(express.json());


app.use('/api/map', mapRoutes);


app.get('/', (req, res) => {
  res.send('Map Tracker API is running');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});