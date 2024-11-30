const express = require('express');
const router = express();
const { deleteUserController } = require('../controllers/index');

router.post('/', deleteUserController);

module.exports = router;