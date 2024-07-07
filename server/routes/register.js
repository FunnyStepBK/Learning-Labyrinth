const express = require('express');
const router = express();
const registerController = require('../controllers/registerController');
const path = require('path');

router.post('/', registerController.handleRegister);

module.exports = router;