const express = require('express');
const router = express.Router();
const Team = require('../models/team');

// INDEX Team
router.get('/', (req, res) => {
    Team.find()
    .then(teams => {
        res.status(200).send(teams);
    })
    .catch(error => {
        if(!res.headersSent) res.status(500).send('Server error');
        console.error(error);
    })
});

// SHOW Team
router.get('/:id', (req, res) => {
    Team.findById(req.params.id)
    .then(team => {
        res.status(200).send(team);
    })
    .catch(error => {
        if(!res.headersSent) res.status(500).send('Server error');
        console.error(error);
    })
});

// CREATE Team
router.post('/', (req, res) => {
    Team.create(Object.assign({ poster: req.user._id}, req.body))
    .then(team => {
        res.status(200).send(team);

        return Promise.all([
            User.findById(req.user._id),
            team._id
        ])
    })
    .then(([user, teamId]) => {
        user.teams.push(teamId)
        user.save();
    })
    .catch(error => {
        if(!res.headersSent) res.status(500).send('Server error');
        console.error(error);
    });
});

// UPDATE Team
router.put('/:id', (req, res) => {
    Team.findById(req.params.id)
    .then(team => {
        if(team.poster == req.user._id) {
            team.set(req.body);
            res.status(200).json(team);
            team.save();
        } else {
            res.status(403).json('Team is not owned by current user');
        }
    })
    .catch(error => {
        if(!res.headersSent) res.status(500).send('Server error');
        console.error(error);
    });
});

// DESTROY Team
router.delete('/:id', (req, res) => {
    Team.findById(req.params.id)
    .then(team => {
        if (team.poster == req.user._id) {
            res.status(200).json(team);
            team.remove();

            User.findById(req.user._id)
            .then(user => {
                const index = user.teams.indexOf(team._id);

                if (index != -1) {
                    user.teams.splice(index, 1)
                    user.save();
                }
            });
        } else {
            res.status(403).send('Team is not owned by current user');
        }
    })
    .catch(error => {
        if(!res.headersSent) res.status(500).send('Server error');
        console.error(error);
    });
});

module.exports = router;
