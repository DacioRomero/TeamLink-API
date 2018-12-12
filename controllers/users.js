// controllers/users.js
const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/user');
const router = express.Router();

router.post('/register', asyncHandler(async (req, res) => {
    const user = await User.create(req.body);

    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: 86400
    });

    res.status(200).send(token);

}));

router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        username
    });

    if (user == null) {
        return res.status(400).send(`${username} not found`)
    }

    user.comparePassword(password, (err, isMatch) => {
        if (err != null) throw err;
        if (!isMatch) return res.status(500).send('Password is incorrect');

        const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
            expiresIn: 86400
        });

        res.status(200).send(token)
    });
}));

module.exports = router;
