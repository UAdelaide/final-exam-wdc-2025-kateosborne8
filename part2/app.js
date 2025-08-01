const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 // uno hour
    }
}));


// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const apiRouter = require('./routes/api');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api', apiRouter);

// Export the app instead of listening here
module.exports = app;
