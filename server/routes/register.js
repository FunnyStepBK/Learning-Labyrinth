const express = require('express');
const router = express();
const { registerController } = require('../controllers/index');

router.post('/', registerController);

module.exports = router;