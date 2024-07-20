const express = require('express');
const router = express();
const { newChapterController }= require('../../../controllers/index');

router.post('/', newChapterController);

module.exports = router;