require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes'); 
const bodyParser = require('body-parser');



const app = express();
const PORT = 3000;

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/', userRoutes);
app.use('/profile', profileRoutes);  

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
