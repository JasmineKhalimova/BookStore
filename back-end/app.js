//Importing Required Modules:
const express = require("express"); // A web framework for Node.js that helps in building web applications and APIs.
const app = express(); // An instance of an Express application.
const mongoose = require('mongoose'); // An Object Data Modeling (ODM) library for MongoDB and Node.js.
const dotenv = require('dotenv'); // A module that loads environment variables from a .env file into process.env.

// Importing Routes
const userRoutes = require('./routes/user');

// Configuring Environment Variables
dotenv.config(); // Loads the environment variables from a .env file into process.env.


// Database Connection
mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser: true}
  ) // Connects to a MongoDB database using the connection string stored in the MONGO_URI environment variable.
.then(() => console.log('DB Connected')); //Logs a success message if the connection is successful.
   
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
}); // Logs an error message if there is an issue with the database connection.

// Middleware to Use Routes
app.use("/api", userRoutes);

// Starting the Server
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});