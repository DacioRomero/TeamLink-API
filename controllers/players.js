// controllers/players.js
const Player = require('../models/player');
const Comment = require('../models/comment');
const roles = Player.schema.path('role').enumValues;

module.exports = app => {
    // INDEX Player
    app.get('/players', (req, res) => {
        Player.find().lean()
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
            res.redirect(`/players/${player._id}`);
        })
        .catch(console.error);
    });

    // SHOW Player
    app.get('/players/:id', (req, res) => {
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
    app.get('/players/:id/edit', (req, res) => {
        Player.findById(req.params.id).lean()
        .then(player => {
            res.render('players-edit', { player: player, roles: roles });
        })
        .catch(console.error);
    });

    // UPDATE Player
    app.put('/players/:id', (req, res) => {
        Player.findByIdAndUpdate(req.params.id, req.body).lean()
        .then(player => {
            res.redirect(`/players/${req.params.id}`);
        })
        .catch(console.error);
    });

    // DESTROY Player
    app.delete('/players/:id', (req, res) => {
        Promise.all([
            Player.findByIdAndRemove(req.params.id).lean(),
            Comment.find({ playerId: req.params.id }).remove().lean()
        ])
        .then(() => {
            res.redirect('/players');
        })
        .catch(console.error);
    });
}
