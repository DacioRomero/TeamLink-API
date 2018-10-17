// controllers/teams.js
const express = require('express');
const router = express.Router();
const Team = require('../models/team')

// INDEX Team
router.get('/teams', (req, res) => {
    Team.find().lean()
    .then(teams => {
        res.render('teams-index', { teams: teams });
    })
    .catch(console.error);
});

// NEW Team
router.get('/teams/new', (req, res) => {
    res.render('teams-new');
});

// SHOW Team
router.get('/teams/:id', (req, res) => {
    Team.findById(req.params.id).lean()
    .then(team => {
        res.render('teams-show', { team: team });
    })
    .catch(console.error);
});

// CREATE Team
router.post('/teams', (req, res) => {
    Team.create(req.body)
    .then(team => {
        res.redirect(`/teams/${team._id}`);
    })
    .catch(console.error);
});

// UPDATE Team
router.put('/teams/:id', (req, res) => {
    Team.findByIdAndUpdate(req.params.id, req.body).lean()
    .then(team => {
        res.redirect(`/teams/${team._id}`);
    })
    .catch(console.error);
});

// EDIT Team
router.get('/teams/:id/edit', (req, res) => {
    Team.findById(req.params.id).lean()
    .then(team => {
        res.render('teams-edit', { team: team });
    })
    .catch(console.error);
});

// DESTROY Team
router.delete('/teams/:id', (req, res) => {
    Team.findByIdAndDelete(req.params.id)
    .then(team => {
        res.redirect('/teams');
    })
    .catch(console.error);
});

module.exports = router;
