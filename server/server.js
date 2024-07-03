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

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.use(express.static(path.join(__dirname, '../build')));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/remove', require('./routes/delete'));
app.post('/test', (req, res) => {
  res.json({ "message": 'Success!' });
});

app.all('*', (req, res) => {
  res.status(404);
});

mongoose.connection.once('open', () => {
  console.log('Connected to mongoDB');
  app.listen(port, () => console.log(`Server running on port ${port}`));
});