// controllers/players.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const Player = require('../models/player');
const User = require('../models/user');

const router = express.Router();
const Authorize = require('../utils/authorize');

// INDEX Player
router.get('/', asyncHandler(async (req, res) => {
    const players = await Player.find().lean();

    res.status(200).json(players);
}));

// SHOW Player
router.get('/:id', asyncHandler(async (req, res) => {
    const player = await Player.findById(req.params.id).lean();

    res.status(200).json(player);
}));

// CREATE Player
router.post('/', Authorize, asyncHandler(async (req, res) => {
    const player = new Player(req.body);
    player.poster = req.user._id;

    const user = await User.findById(req.user._id);
    user.players.unshift(player._id);

    await Promise.all([
        player.save(),
        user.save()
    ]);

    res.status(200).json(player);
}));

// UPDATE Player
router.put('/:id', Authorize, asyncHandler(async (req, res) => {
    const player = await Player.findById(req.params.id);

    if (player.poster != req.user._id) {
        return res.status(403).send('Player not posted by current user');
    }

    player.set(req.body);
    await player.save();

    res.status(200).json(player)
}));

// DESTROY Player
router.delete('/:id', Authorize, asyncHandler(async (req, res) => {
    const player = await Player.findById(req.params.id);

    if (player.poster != req.user._id) {
        return res.status(403).send('Player not posted by current user')
    }

    const user = await User.findById(req.user._id);
    const playerIndex = user.players.indexOf(player._id);

    if (playerIndex != -1) {
        user.players.splice(playerIndex, 1);
    }

    Promise.all([
        player.remove(),
        user.save()
    ]);

    res.status(200).json(player);
}));

module.exports = router;
