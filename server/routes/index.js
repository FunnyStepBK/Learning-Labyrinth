const express = require('express');
const router = express();


// User related Routes
router.use('/register', require('./register'));
router.use('/login', require('./auth'));
router.use('/refresh', require('./refresh'));
router.use('/logout', require('./logout'));

// Course Routes
router.use('/course/create', require('./courseAPIs/newCourse'));

// Chapter Routes
router.use('/course/:courseId/chapter/add', require('./courseAPIs/chapterAPIs/newChapter'));

// Protected Routes (using JWT verification) 
router.use(require('../middleware/VerifyJWT'));
router.use('/remove', require('./delete'));

// Test route
router.post('/test', (req, res) => {
  res.json({ message: 'Success!' });
});

module.exports = router;