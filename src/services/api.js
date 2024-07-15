import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Replace with your API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example API functions
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBooks = async () => {
  try {
    const response = await api.get('/api/books');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more API functions as needed for your project

export default api;
