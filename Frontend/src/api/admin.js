import axios from 'axios';
const REACT_APP_URL=import.meta.env.REACT_APP_URL
// Get the token from local storage
const getToken = () => {
    return localStorage.getItem('token'); // Retrieve the token from local storage
};

// Get all users
export const getUsers = async () => {
    const token = getToken(); // Get the token
    return await axios.get(`${REACT_APP_URL}/api/admin/users`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Create a new user
export const createUser  = async (userData) => {
    const token = getToken(); // Get the token
    return await axios.post(`${REACT_APP_URL}/api/admin/users`, userData, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Update a user
export const updateUser  = async (id, userData) => {
    const token = getToken(); // Get the token
    return await axios.put(`${REACT_APP_URL}/api/admin/users/${id}`, userData, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Delete a user
export const deleteUser  = async (id) => {
    const token = getToken(); // Get the token
    return await axios.delete(`${REACT_APP_URL}/api/admin/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Get user by ID
export const getUserById = async (id) => {
    const token = getToken(); // Get the token
    return await axios.get(`${REACT_APP_URL}/api/admin/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};