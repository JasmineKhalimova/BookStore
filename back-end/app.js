const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//import routes
const userRoutes = require('./routes/user');

dotenv.config();


//db connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
  )
.then(() => console.log('DB Connected'))
   
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

//routes middle we
app.use(userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});