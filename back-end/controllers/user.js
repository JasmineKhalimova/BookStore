const User = require("../models/user");
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec()
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            req.profile = user;
            next();
        })
        .catch(err => {
            return res.status(400).json({
                error: "User not found"
            });
        });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};