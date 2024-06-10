const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler');

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
