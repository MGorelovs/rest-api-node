const express = require('express');
const router = express.Router();
const db = require('../queries/servicers');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, db.getAllServicers);
router.get('/:id', checkAuth, db.getSingleServicer);

module.exports = router;