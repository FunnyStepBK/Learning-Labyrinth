const axios = require('axios');
const path = require('path');
const fsPromises = require('fs').promises;

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const apiUrl = process.env.API_URI || 'http://localhost:5000';
const apiKey = process.env.API_KEY_1;



const addChapter = async () => {
  try {
    const templatePath = path.join(__dirname, 'chapterTemplate.json');
    const chapterData = JSON.parse(await fsPromises.readFile(templatePath, 'utf-8'));

    const courseId = 'JS001';

    const respone = await axios.post(`${apiUrl}/course/${courseId}/chapter/add`, chapterData,{
      headers: {
        'x-api-key': apiKey,
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    console.log(`Chpaters/Chapter added successfully`, respone.data.message);
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
      console.error('Error creating the chapter/chapters:', error.message);
    }
  }
} 

addChapter();