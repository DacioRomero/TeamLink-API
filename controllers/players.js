// controllers/players.js
const Player = require('../models/player');
const roles = Player.schema.path('role').enumValues;

module.exports = app => {
    // INDEX Player
    app.get('/players', (req, res) => {
        Player.find()
        .then(players => {
            res.render('players-index', { players: players });
        })
        .catch(console.error);
    });

    // NEW Player
    app.get('/players/new', (req, res) => {
        res.render('players-new', { roles: roles });
    });

    // CREATE Player
    app.post('/players', (req, res) => {
        Player.create(req.body)
        .then(player => {
            res.redirect('/players');
        })
        .catch(console.error);
    });

    // SHOW Player
    app.get('/players/:id', (req, res) => {
        Player.findById(req.params.id)
        .then(player => {
            res.render('players-show', { player: player });
        })
        .catch(console.error);
    });

    // EDIT Player
    app.get('/players/:id/edit', (req, res) => {
        Player.findById(req.params.id)
        .then(player => {
            res.render('players-edit', { player: player, roles: roles });
        })
        .catch(console.error);
    });

    // UPDATE Player
    app.put('/players/:id', (req, res) => {
        Player.findByIdAndUpdate(req.params.id, req.body)
        .then(player => {
            res.redirect('/players');
        })
        .catch(console.error)
    });

    // DESTROY Player
    app.delete('/players/:id', (req, res) => {
        Player.findByIdAndRemove(req.params.id)
        .then(player => {
            res.redirect('/players');
        })
        .catch(console.error)
    });
}
