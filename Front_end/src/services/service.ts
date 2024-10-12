import axios from "axios";


// Function to retrieve the token from localStorage
async function getToken() {
    // Fetch the token stored in localStorage under the key 'token'
    const cToken = localStorage.getItem('token');
    
    // Return the token if it exists, otherwise return an empty string
    return cToken || '';
}

// Creating an axios instance with default configuration
const api = axios.create({
    // Setting the base URL for all API requests
    baseURL: "http://localhost:8888/",
    
    // Setting default headers for requests: accept JSON responses and send JSON data
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

// Adding an interceptor to modify the request before it is sent
api.interceptors.request.use(
    async function (config) {
        // Retrieve the token asynchronously
        const token = await getToken();
        
        // If the token exists, add the Authorization header with the Bearer token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Return the modified config to proceed with the request
        return config;
    }, 
    function (error) {
        // If an error occurs during request configuration, reject the promise
        return Promise.reject(error);
    }
);

// Exporting the configured axios instance for use in other parts of the application
export default api;
