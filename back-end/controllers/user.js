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
exports.signin = (req,res) => {

    const {email, password} = req.body;
    
    User.findOne({ email }, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User not found. Please create account!"
            });
        }
        
        //user authentication method
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password does not match"
            });
        }
        
        //generate a signed token with use id and secrect
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        //persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999});

        //return response with user and token to frontent client
        const {_id, name, email, role} = user;

        return res.json({token, user: {_id, emai, name, role}});
    });
};