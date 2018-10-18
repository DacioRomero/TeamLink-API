const express = require('express');
const router = express.Router();

const players = require('./players');
const comments = require('./comments');
const teams = require('./teams');

router.use('/', players);
router.use('/', comments);
router.use('/', teams);

router.use('/v1', players);
router.use('/v1', comments);
router.use('/v1', teams);

module.exports = router;
