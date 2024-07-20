const axios = require('axios');
const path = require('path');
const fsPromises = require('fs').promises; 
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const apiUrl = process.env.API_URI || 'http://localhost:5000';
const apiKey = process.env.API_KEY_1;

const createCourse = async () => {
  try {
    const templatePath = path.join(__dirname, 'courseTemplate.json');
    const courseData = JSON.parse(await fsPromises.readFile(templatePath, 'utf-8'));
    
    const response = await axios.post(`${apiUrl}/course/create`, courseData, {
      headers: {
        'x-api-key': apiKey,
        'Authorization': `Bearer ${apiKey}`
      }
    });
  
  } catch (error) {
    if (error.response) {
      // Server responded with a status code different from 2xx
      console.error(`Error creating the course/courses: ${error.response.status} ${error.response.statusText}`);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Error creating the course/courses: No response received.');
      console.error('Request data:', error.request);
    } else {
      // Something else went wrong in setting up the request
      console.error('Error creating the course/courses:', error.message);
    }
  }
}

createCourse();