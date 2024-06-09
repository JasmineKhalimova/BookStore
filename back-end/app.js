//Importing Required Modules:
const express = require('express'); // A web framework for Node.js that helps in building web applications and APIs.
const mongoose = require('mongoose'); // An Object Data Modeling (ODM) library for MongoDB and Node.js.
const morgan = require('morgan');// HTTP request logger middleware, logs details about incoming requests to the console or a log file.
const bodyParser = require('body-parser');//is a middleware for parsing incoming request bodies in a middleware before your handlers, available under the req.body property. 
const cookieParser = require('cookie-parser'); //Middleware for parsing cookies from the HTTP request headers.

// Configuring Environment Variables
// Loads the environment variables from a .env file into process.env.
require('dotenv').config();// A module that loads environment variables from a .env file into process.env.

// Importing Routes
const userRoutes = require('./routes/user');

const app = express(); // An instance of an Express application.

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connected'));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); //  used to parse JSON and URL-encoded form data sent in POST requests
app.use(cookieParser());

// Log requests to ensure they are being received
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

// Middleware to Use Routes
app.use('/api', userRoutes);

// Starting the Server
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});