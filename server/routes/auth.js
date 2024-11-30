const express = require('express');
const router = express();
const { authController } = require('../controllers/index');

router.post('/', authController);

module.exports = router;