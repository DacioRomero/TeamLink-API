// controllers/teams.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const commentController = require('./comments');
const Team = require('../models/team');
const User = require('../models/user');
const verify = require('../utils/verify-authentication')

const router = express.Router();

// INDEX Team
router.get('/', asyncHandler(async (req, res) => {
    const teams = await Team.find().lean();

    res.status(200).json(teams);
}));

// SHOW Team
router.get('/:id', asyncHandler(async (req, res) => {
    const team = await Team.findById(req.params.id).lean();

    res.status(200).json(team);
}));

// CREATE Team
router.post('/', verify, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const team = new Team(req.body);

    team.poster = req.user._id;
    user.teams.push(team._id);

    await Promise.all([
        team.save(),
        user.save()
    ]);

    res.status(200).json(team);
}));

// UPDATE Team
router.put('/:id', verify, asyncHandler(async (req, res) => {
    const team = await Team.findById(req.params.id);

    if (team.poster != req.user._id) {
        return res.status(403).send(`${team._id} not posted by current user`);
    }

    team.set(req.body);
    await team.save();

    res.status(200).json(team);
}));

// DESTROY Team
router.delete('/:id', verify, asyncHandler(async (req, res) => {
    const [user, team] = await Promise.all([
        User.findById(req.user._id),
        Team.findById(req.params.id)
    ]);

    if (team.poster != user._id.toString()) {
        return res.status(403).send(`${team._id} not posted by current user`);
    }

    const teamIndex = user.teams.indexOf(team._id);

    if (teamIndex != -1) {
        user.teams.splice(teamIndex, 1);
    }

    await Promise.all([
        team.remove(),
        user.save()
    ]);

    res.status(200).send(team);
}));

router.use('/:parentId/comments', commentController('Team'));

module.exports = router;
