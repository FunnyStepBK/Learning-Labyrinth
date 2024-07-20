const registerController = require('./registerController');
const authController = require('./authController');
const refreshController = require('./refreshController');
const logoutController = require('./logoutController');
const deleteUserController = require('./deleteController');


const newCourseController = require('./Courses/newCourseController');


const newChapterController = require('./Chapters/newChapterController');

module.exports = {
  registerController,
  authController,
  refreshController,
  logoutController,
  deleteUserController,
  newCourseController,
  newChapterController
};