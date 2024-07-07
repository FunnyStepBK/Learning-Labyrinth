import axios from 'axios';

export default async function sendFormData(formData, endpoint) {
  try {
    const response = await axios.post(`http://localhost:5000/${endpoint}`, formData);

    // Handle successful response
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }

    // Handle error response
    throw error;
  }
}

