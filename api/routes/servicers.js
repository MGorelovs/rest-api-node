const express = require('express');
const router = express.Router();
const db = require('../queries/servicers');

router.get('/', db.getAllServicers);
router.get('/:id', db.getSingleServicer);

module.exports = router;