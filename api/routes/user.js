const express = require('express');
const router = express.Router();
const db = require('../queries/user');

router.post('/signup', db.signUp);
router.post('/login', db.logIn);
router.delete('/:userId', db.removeUser);

module.exports = router;