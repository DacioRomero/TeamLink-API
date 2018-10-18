const express = require('express');
const router = express.Router();

router.use('/v1', require('./v1/players'));
router.use('/v1', require('./v1/comments'));
router.use('/v1', require('./v1/teams'));

// Support deprecated non-versioned API routes
router.all(/^\/(?!v\d+?).+?$/, (req, res) => {
    res.redirect(307, `/api/v1${req.url}`)
});

module.exports = router;
