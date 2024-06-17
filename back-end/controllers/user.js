const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler');
const jwt = require("jsonwebtoken"); // to generate signed in token
const expressJwt = require("express-jwt"); // for authorization check


exports.signup = async (req, res) => {
    //console.log("req.body", req.body);

    const user = new User(req.body);

    try {
        const savedUser = await user.save();
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({ user: savedUser });
    } catch (err) {
        res.status(400).json({ err: errorHandler(err)   
        });
    }
};

// sign-in method
exports.signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email using async/await with findOne
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          error: "User not found. Please create account!",
        });
      }
  
      // User authentication
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password don't match",
        });
      }
  
      // Generate a signed token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  
      // Persist the token in a cookie
      res.cookie("t", token, { expire: new Date() + 9999 });
  
      // Return response with user and token
      const { _id, name, email: userEmail, role } = user; // Use userEmail to avoid naming conflict
  
      return res.json({ token, user: { _id, name, userEmail, role } });
    } catch (err) {
      // Handle errors appropriately, like logging or sending a generic error message
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //signout method
  exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({message:"Signout success"});
  }

  // protecting routes