const express = require('express');
const router = express();
const { refreshController } = require('../controllers/index');

router.get('/', refreshController);

module.exports = router;