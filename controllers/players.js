// controllers/players.js
const Player = require('../models/player');
const roles = Player.schema.path('role').enumValues;

console.log('Roles ' + roles)

module.exports = app => {
    app.get('/', (req, res) => {
        Player.find()
        .then(players => {
            res.render('players-index', { players: players });
        })
        .catch(console.error);
    });

    app.get('/players/new', (req, res) => {
        res.render('players-new', { roles: roles });
    });

    app.get('/players/:id', (req, res) => {
        Player.findById(req.params.id)
        .then(player => {
            res.render('players-show', { player: player });
        })
        .catch(console.error);
    });

    app.post('/players', (req, res) => {
        Player.create(req.body)
        .then(player => {
            res.redirect('/');
        })
        .catch(console.error);
    });

    app.delete('/players/:id', (req, res) => {
        Player.findByIdAndRemove(req.params.id)
        .then(player => {
            res.redirect('/');
        })
        .catch(console.error)
    });

    app.get('/players/:id/edit', (req, res) => {
        Player.findById(req.params.id)
        .then(player => {
            res.render('players-edit', { player: player, roles: roles });
        })
        .catch(console.error);
    });

    app.put('/players/:id', (req, res) => {
        Player.findByIdAndUpdate(req.params.id, req.body)
        .then(player => {
            res.redirect('/');
        })
        .catch(console.error)
    });
}
