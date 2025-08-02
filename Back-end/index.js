const express = require('express');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');


app.use(cors({
  origin: 'http://localhost:3000', // allow only your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/movies", movieRoutes);






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});