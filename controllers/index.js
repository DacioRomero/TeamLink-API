// controllers/teams.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { teams: values[0], players: values[1] });
});

module.exports = router
