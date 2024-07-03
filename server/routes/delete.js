const express = require('express');
const router = express();
const deleteUserController = require('../controllers/deleteController');

router.post('/', deleteUserController.handleDelete);

module.exports = router;