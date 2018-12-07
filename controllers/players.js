const express = require('express');
const Player = require('../models/player');
const User = require('../models/user');

const router = express.Router();
const Authorize = require('../utils/authorize');

// INDEX Player
router.get('/', (req, res) => {
    Player.find().lean()
    .then(players => {
        res.status(200).send(players)
    })
    .catch(error => {
        if(!res.headersSent) res.status(500).send('Server error');
        console.error(error);
    });
});

// SHOW Player
router.get('/:id', (req, res) => {
    Player.findById(req.params.id).lean()
    .then(player => {
        res.status(200).send(player);
    })
    .catch(error => {
        if(!res.headersSent) res.status(500).send('Server error');
        console.error(error);
    });
});

// CREATE Player
router.post('/', Authorize, (req, res) => {
    const user = req.user;

    Player.create(Object.assign({ poster: user._id }, req.body))
    .then(player => {
        res.status(200).send(player);

        return Promise.all([
            User.findById(user._id),
            player._id
        ]);
    })
    .then(([user, playerId]) => {
        user.players.unshift(playerId);
        user.save();
    })
    .catch(error => {
        if(!res.headersSent) res.status(500).send('Server error');
        console.error(error);
    });
});

// UPDATE Player
router.put('/:id', Authorize, (req, res) => {
    const user = req.user;

    Player.findById(req.params.id)
    .then(player => {
        if (player.poster._id == user._id) {
            player.set(req.body)
            res.status(200).json(player)
            player.save()
        } else {
            res.status(403).send('Player not owned by this user')
        }
    })
    .catch(error => {
        if(!res.headersSent) res.status(500).send('Server error');
        console.error(error);
    });
});

// DESTROY Player
router.delete('/:id', Authorize, (req, res) => {
    const user = req.user;

    Promise.all([
        Player.findByIdAndDelete(req.params.id),
        User.findById(user._id)
    ])
    .then(([player, user]) => {
        res.status(200).json(player)

        const index = user.players.indexOf(player._id);

        if (index != -1) {
            console.log('WORKED!')
            user.players.splice(index, 1)
            user.save();
        }
    })
    .catch(error => {
        if(!res.headersSent) res.status(500).send('Server error');
        console.error(error);
    });
});

module.exports = router;
