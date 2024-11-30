const express = require('express');
const router = express();
const { updateCourseController } = require('../../controllers/index');

router.put('/', updateCourseController);

module.exports = router;