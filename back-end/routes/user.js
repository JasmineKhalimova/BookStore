const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const { userById, read, update } = require('../controllers/user');

router.get('/secret/:id', requireSignin, (req, res) => {
    const secretId = req.params.id;
    res.json({
        user: 'got here yay'
    });
});

router.get('/user/:userId', requireSignin, isAuth, read);


router.param('userId', userById);

module.exports = router;