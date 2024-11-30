const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const verifyJWT = require('./middleware/VerifyJWT');
const cookieParser = require('cookie-parser');
const port = 5000;

// Connect to MongoDB
connectDB();

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// Middleware for Cookies
app.use(cookieParser());

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// Serve production build of React app
app.use(express.static(path.join(__dirname, '../build')));

// * - Routes
app.use('/', require('./routes'));

// Handle 404 errors
app.all('*', (req, res) => {
  res.status(404).send('Not Found');
});

// console.log('API Key:', process.env.DATABASE_URI);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => console.log(`Server running on port ${port}`));
});