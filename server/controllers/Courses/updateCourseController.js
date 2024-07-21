const Course = require('../../model/Course');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env') });

const updateExistingCourse = async (req, res) => {
  try {
    const key = req.headers['x-api-key'];
    const validApiKeys = [process.env.API_KEY_1, process.env.API_KEY_2];
    
    // * - Check if the API key is correct
    if (!validApiKeys.includes(key)) {
      return res.status(401).json({
        errorCode: '#1003',
        message: 'Invalid API key',
        success: false
      });
    }

    const courseId = req.params.courseId;
    const updatedCourseData = req.body;

    // * - Check if the courseId provided in the URL params exists in the database
    const course = await Course.findOne(courseId);
    if (!course) {
      return res.status(404).json({
        errorCode: '#1002',
        message: 'Course not found',
        success: false
      });
    }
    
    // * - Validate that immutable fields are not included in the update
    if (updatedCourseData.courseId) {
      return res.status(400).json({
        errorCode: '#1001',
        message: 'Cannot update courseId',
        success: false
      });
    }
    
    // if (updatedCourseData.chapters && updatedCourseData.chapters.some(chapter => chapter.chapterId)) {
      // return res.status(400).json({
        // errorCode: '#1001',
        // message: 'Cannot update chapterId',
        // success: false
      // });
    // }

    // // * - Validate that all required fields are present
    // const requiredFields = ["title", "description"];
    // const missingFields = requiredFields.filter(field => !updatedCourseData[field]);

    // if (missingFields.length > 0) {
    //   return res.status(400).json({
    //     errorCode: '#1001',
    //     message: `Missing required fields: ${missingFields.join(', ')}`,
    //     success: false
    //   });
    // }

    course.title = updatedCourseData.title || course.title;
    course.description = updatedCourseData.description || course.description;

    // * - Handle updating chapters if chapters are included in the update
    if (updatedCourseData.chapters) {
      updatedCourseData.chapters.forEach((chapter) => {
        const existingChapterIndex = course.chapters.findIndex(chap => chap.chapterId === chapter.chapterId);
        if (existingChapterIndex !== -1) {
          // * - Update the existing Chapter
          course.chapters[existingChapterIndex] = chapter;
        } else {
          // * - If the Chapter doesn't exist in the database, add it
          course.chapters.push(chapter);
        }
      });
    }

    const updatedCourse = await course.save();

    return res.status(200).json({
      message: 'Course Updated Successfully',
      course: updatedCourse,
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


module.exports = updateExistingCourse;