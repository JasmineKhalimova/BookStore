const User = require('../models/user');

exports.signup = async (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.json({ user: savedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
