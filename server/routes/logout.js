const express = require('express');
const router = express();
const { logoutController } = require('../controllers/index');

router.get('/', logoutController);

module.exports = router;