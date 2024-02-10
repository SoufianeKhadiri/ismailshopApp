import axios from 'axios';

async function fetchDataWithToken(apiUrl, token) {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        mode: 'no-cors' // Include the token in the Authorization header
      }
    });

    return response.data; // The response data is typically found in `response.data` with Axios
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default fetchDataWithToken;

// // Example usage
// const apiUrl = 'https://yourapi.com/data';
// const token = 'yourAuthToken'; // Replace with your actual token

// fetchDataWithToken(apiUrl, token)
//   .then(data => {
//     console.log('Fetched data:', data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });
