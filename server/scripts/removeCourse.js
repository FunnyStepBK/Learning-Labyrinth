const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
const apiUrl = process.env.API_URI || 'http://localhost:5000';
const apiKey = process.env.API_KEY_1;

const removeCourse = async () => {
  try {
    const ids = {
      courseId: '85a0723a-fa32-41e0-9843-30d04aa686f5',
      chapterIds: [chapterId]
    };
    
    const response = await axios.delete(`${apiUrl}/course/remove`, {
      headers: {
        'x-api-key': apiKey,
        'Authorization': apiKey 
      }
    });

    console.log(response.data);
  } catch (error) {
    if (error.response) {
      // * - Server responded with a status code different from 2xx
      console.error(`Error creating the course/courses: ${error.response.status} ${error.response.statusText}`);
      console.error('Response data:', error.response.data);

    } else if (error.request) {
      // * - Request was made but no response was received
      console.error('Error creating the course/courses: No response received.');
      console.error('Request data:', error.request);
      
    } else {
      // * - Something else went wrong in setting up the request
      console.error('Error creating the course/courses:', error.message);
    }
  }
}

removeCourse();