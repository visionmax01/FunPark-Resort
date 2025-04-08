import axios from 'axios';

// const API_BASE_URL = 'http://localhost:7000';
const API_BASE_URL = 'https://funpark-resort-backend.vercel.app';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Automatically add auth token to requests if available
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
