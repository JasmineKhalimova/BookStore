const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const jwt = require("jsonwebtoken"); // to generate signed in token
const { expressjwt } = require("express-jwt"); // for authorization check

exports.signup = async (req, res) => {
    const user = new User(req.body);

    try {
        const savedUser = await user.save();
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({ user: savedUser });
    } catch (err) {
        res.status(400).json({ err: errorHandler(err) });
    }
};

// sign-in method
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: "User not found. Please create account!",
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password don't match",
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.cookie("t", token, { expire: new Date() + 9999 });

        const { _id, name, email: userEmail, role } = user;

        return res.json({ token, user: { _id, name, userEmail, role } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//signout method
exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Signout success" });
}

// protecting routes
exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.auth = decoded;
        next();
    });
};
