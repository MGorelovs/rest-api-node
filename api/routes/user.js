const express = require('express');
const router = express.Router();
const db = require('../queries/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', db.signUp);
router.post('/login', db.logIn);
router.delete('/:userId', checkAuth, db.removeUser);

module.exports = router;