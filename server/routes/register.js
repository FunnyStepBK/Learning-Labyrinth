const express = require('express');
const router = express();
const registerController = require('../controllers/registerController');

router.post('/', registerController.handleRegister);

module.exports = router;