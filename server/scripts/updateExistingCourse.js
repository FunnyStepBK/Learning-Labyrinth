const axios = require('axios');
const path = require('path');
const fsPromises = require('fs').promises;
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env')});
const apiUrl = process.env.API_URI || 'http://localhost:5000';
const apiKey = process.env.API_KEY_1;

const updateCourse = async () => {
  try {
    const templatePath = path.join(__dirname, '..', 'templates', 'updateCourseTemplate.json');
    const updatedCourseData = JSON.parse(await fsPromises.readFile(templatePath, 'utf-8'));

    const courseId = 'JS001';

    const response = await axios.put(`${apiUrl}/course/update/${courseId}`, updatedCourseData, {
      headers: {
        'x-api-key': apiKey,
        'Authorization': `Bearer ${apiKey}`
      }
    });

    console.log(`Updated Successfully, It may take a few seconds for the changes to show up. ${response.data.message}`)
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

updateCourse();