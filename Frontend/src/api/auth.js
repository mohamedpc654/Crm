import axios from 'axios';

// Login function
export const login = async (credentials) => {
    return await axios.post('http://localhost:4000/api/auth/login', credentials);
};

// Register function
export const register = async (userData) => {
    return await axios.post('http://localhost:4000/api/auth/register', userData);
};