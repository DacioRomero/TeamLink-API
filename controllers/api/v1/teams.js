const express = require('express');
const router = express.Router();
const Team = require('../../../models/team');

// INDEX Team
router.get('/teams', (req, res) => {
    Team.find().lean()
    .then(teams => {
        res.status(200).send(teams);
    })
    .catch(error => {
        res.status(400).send(error);
        console.error(error);
    })
});

// CREATE Team
router.post('/teams', (req, res) => {
    Team.create(req.body)
    .then(team => {
        res.status(200).send(team);
    })
    .catch(error => {
        res.status(400).send(error);
        console.error(error);
    });
});

// SHOW Team
router.get('/teams/:id', (req, res) => {
    Team.findById(req.params.id).lean()
    .then(team => {
        res.status(200).send(team);
    })
    .catch(error => {
        res.status(400).send(error);
        console.error(error);
    })
});

// UPDATE Team
router.put('/teams/:id', (req, res) => {
    Team.findByIdAndUpdate(req.params.id, req.body).lean()
    .then(team => {
        res.status(200).send(team);
    })
    .catch(error => {
        res.status(400).send(error);
        console.error(error);
    });
});

// DESTROY Team
router.delete('/teams/:id', (req, res) => {
    Team.findByIdAndDelete(req.params.id).lean()
    .then(team => {
        res.status(200).send(team);
    })
    .catch(error => {
        res.status(400).send(error);
        console.error(error);
    });
});

module.exports = router;
