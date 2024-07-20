const express = require('express');
const router = express();
const { newCourseController } = require('../../controllers/index');

router.post('/', newCourseController);

module.exports = router;