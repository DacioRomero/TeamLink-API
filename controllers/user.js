const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Authorize = require('../utils/authorize');

const router = express.Router();

router.post('/register', (req, res) => {
    User.create(req.body)
    .then(user => {
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400
        });

        return res.status(200).send(token);
    })
    .catch(error => {
        console.error(error);

        return res.status(500).send('Server error');
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
    .then(user => {
        if(user == null) return res.status(400).send(`${username} not found`)

        user.comparePassword(password, (err, isMatch) => {
            if(err != null) throw err;

            if(!isMatch) return res.status(500).send('Password is incorrect');

            const token = jwt.sign({ id: user._id }, process.env.SECRET, {
                expiresIn: 86400
            });

            return res.status(200).send(token);
        });
    })
    .catch(error => {
        console.error(error);

        return res.status(500).send('Server error');
    })
});

module.exports = router;
