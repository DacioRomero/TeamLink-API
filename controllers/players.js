// controllers/players.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const Player = require('../models/player');
const commentController = require('./comments');
const verify = require('../utils/verify-authentication');

const router = express.Router();

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
router.post('/', verify, asyncHandler(async (req, res) => {
  const player = new Player(req.body);
  player.poster = req.user._id;

  await player.save();

  res.status(200).json(player);
}));

// UPDATE Player
router.put('/:id', verify, asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);

  if (player.poster.toString() !== req.user._id) {
    return res.status(403).send('Player not posted by current user');
  }

  player.set(req.body);
  await player.save();

  return res.status(200).json(player);
}));

// DESTROY Player
router.delete('/:id', verify, asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);

  if (player.poster.toString() !== req.user._id) {
    return res.status(403).send('Player not posted by current user');
  }

  await player.remove();

  return res.status(200).json(player);
}));

router.use('/:parentId/comments', commentController('Player'));

module.exports = router;
