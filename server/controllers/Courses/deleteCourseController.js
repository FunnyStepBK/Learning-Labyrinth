const Course = require('../../model/Course');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env')});

const handleDeleteCourse = async (req, res) => {
  try {
    const key = req.headers['x-api-key'];
    const validKeys = [process.env.API_KEY_1, process.env.API_KEY_2];

    // * -Check if the API key is valid
    if (!validKeys.includes(key)) {
      return res.status(401).json({
        errorCode: '#1003',
        message: 'Invalid API key!',
        success: false
      });
    }

    const { courseId, chapterIds } = req.body;
    const course = await Course.findOne(courseId);

    if (!course) {
      return res.status(204).json({
        errorCode: '#1002',
        message: "Nothing to delete, the course ID doesn't exist in the database",
        success: false
      });
    }

    const result = await Course.deleteOne({ _id: course._id });
    console.log('Successfully deleted the course');
    
    return res.status(200).json({
      message: `Course: ${course.title} deleted successfully`,
      success: true,
      result
    });
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(500).json({
      errorCode: '#1005',
      message: 'Server encountered an unexpected condition',
      success: false 
    });
  }
}

module.exports = handleDeleteCourse;