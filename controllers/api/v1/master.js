const express = require('express');
const router = express.Router();

router.use(require('./players'));
router.use(require('./comments'));
router.use(require('./teams'));

module.exports = router;
