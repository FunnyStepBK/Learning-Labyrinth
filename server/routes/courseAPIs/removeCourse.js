const express = require('express');
const router = express();
const { removeCourseController } = require('../../controllers/index');

router.delete('/', removeCourseController);

module.exports = router;