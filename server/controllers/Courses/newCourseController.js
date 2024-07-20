const Course = require('../../model/Course');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env') });

const handleNewCourse = async (req, res) => {
  try {
    const key = req.headers['x-api-key'];
    const validApiKeys = [process.env.API_KEY_1, process.env.API_KEY_2];
    
    if (!validApiKeys.includes(key)) {
      return res.status(401).json({
        errorCode: "#1003",
        message: "Invalid API key",
        success: false,
      });
    }
    
    const courseData = req.body;

    // * - Check if courseData is an array
    if (!Array.isArray(courseData)) {
      return res.status(400).json({
        errorCode: '#1001',
        message: 'Invalid courses data format. Please provide an array of courses.',
        success: false
      });
    }
    
    // * - Check if all the required Details have been provided
    const allFieldsPresent = courseData.every(course => Object.values(course).every(dataEntry => dataEntry));
    if (!allFieldsPresent) {
      return res.status(400).json({
        errorCode: '#1001',
        message: "Provide all the required details.",
        success: false
      });
    }
  
    const createdCourses = [];
    for (const course of courseData) {
      const result = await Course.create(course);
      createdCourses.push(result);
    }

    console.log(createdCourses);

    return res.status(201).json({
      message: "Course created Successfully",
      course: createdCourses,
      success: true
    });
    
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(500).json({ 
      errorCode: "#1005",
      message: "Server encountered an unexpected condition",
      success: false
    });
  }
  
}

module.exports = handleNewCourse;