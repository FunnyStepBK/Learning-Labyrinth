import axios from "axios";

export default async function logoutUser () {
  try {
    const response = await axios.get('http://localhost:5000/logout'); 

    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }

    throw error;
  }
}