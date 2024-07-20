const Course = require('../../model/Course');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env') });

const handleNewChapter = async (req, res) => {
  try {
    const key = req.headers['x-api-key'];
    const validApiKeys = [process.env.API_KEY_1, process.env.API_KEY_2];

    if (!validApiKeys.includes(key)) {
      return res.status(401).json({
        errorCode: '#1003',
        message: 'Invalid API key.',
        success: false,
        api_key1: process.env.API_KEY_1 
      });
    }
    
    const courseId = req.params.courseId;
    console.log('Received courseId:', courseId);
    const chapterData = req.body;

    // ? - Check if the courseId provided in the url params exists is in the Database
    const course = await Course.findOne(courseId);
    if (!course) return res.status(404).json({
      errorCode: '#1002',
      message: 'Course not found',
      success: false,
      courseId
    }); 


    // * - Check if chapterData is an array
    if (!Array.isArray(chapterData)) {
      return res.status(400).json({
        errorCode: '#1001',
        message: 'Invalid chapters data format. Please Provide an array of chapters',
        success: false
      });
    }

    // * - Check if all the required Details have been provided 
    const allFieldsPresent = chapterData.every(chapter => Object.values(chapter).every(dataEntry => dataEntry));
    if (!allFieldsPresent) {
      return res.status(400).json({
        errorCode: '#1001',
        message: 'Provide all the required details',
        success: false 
      });
    }

    const createdChapters = [];

    for (const chapter of chapterData) {
      course.chapters.push(chapter);
      const savedCourse = await course.save();
      createdChapters.push(savedCourse.chapters[savedCourse.chapters.length - 1]);
    }

    console.log('Chapters created successfully:', createdChapters);
    return res.status(201).json({
      message: 'Chapters created successfully.',
      chapters: createdChapters,
      success: true
    });
    
    
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(500).json({
      errorCode: '#1005',
      message: 'Server encountered an unexpected condition.',
      success: false
    });
  }
}

module.exports = handleNewChapter;