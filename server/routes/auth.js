const express = require('express');
const router = express();
const handleLogin = require('../controllers/authController');

router.post('/', handleLogin);

module.exports = router;