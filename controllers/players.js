// controllers/players.js
const express = require('express');
const router = express.Router();
const Player = require('../models/player');
const Comment = require('../models/comment');
const roles = Player.schema.path('role').enumValues;

// INDEX Player
router.get('/players', (req, res) => {
    Player.find().lean()
    .then(players => {
        res.render('players-index', { players: players });
    })
    .catch(console.error);
});

// NEW Player
router.get('/players/new', (req, res) => {
    res.render('players-new', { roles: roles });
});

// CREATE Player
router.post('/players', (req, res) => {
    Player.create(req.body)
    .then(player => {
        res.redirect(`/players/${player._id}`);
    })
    .catch(console.error);
});

// SHOW Player
router.get('/players/:id', (req, res) => {
    Promise.all([
        Player.findById(req.params.id).lean(),
        Comment.find({ playerId: req.params.id }).limit(5).lean()
    ])
    .then(values => {
        res.render('players-show', { player: values[0], comments: values[1] });
    })
    .catch(console.error);
});

// EDIT Player
router.get('/players/:id/edit', (req, res) => {
    Player.findById(req.params.id).lean()
    .then(player => {
        res.render('players-edit', { player: player, roles: roles });
    })
    .catch(console.error);
});

// UPDATE Player
router.put('/players/:id', (req, res) => {
    Player.findByIdAndUpdate(req.params.id, req.body).lean()
    .then(player => {
        res.redirect(`/players/${req.params.id}`);
    })
    .catch(console.error);
});

// DESTROY Player
router.delete('/players/:id', (req, res) => {
    Promise.all([
        Player.findByIdAndDelete(req.params.id).lean(),
        Comment.deleteMany({ playerId: req.params.id }).lean()
    ])
    .then(() => {
        res.redirect('/players');
    })
    .catch(console.error);
});

module.exports = router;
