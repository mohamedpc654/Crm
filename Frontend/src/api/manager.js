import axios from 'axios';

// Get the token from local storage
const getToken = () => {
    return localStorage.getItem('token'); // Retrieve the token from local storage
};

// Get all tasks
export const getTasks = async () => {
    const token = getToken(); // Get the token
    return await axios.get('http://localhost:4000/api/manager/tasks', {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Create a new task
export const createTask = async (taskData) => {
    const token = getToken(); // Get the token
    return await axios.post('http://localhost:4000/api/manager/tasks', taskData, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Update a task
export const updateTask = async (id, taskData) => {
    const token = getToken(); // Get the token
    return await axios.put(`http://localhost:4000/api/manager/tasks/${id}`, taskData, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Delete a task
export const deleteTask = async (id) => {
    const token = getToken(); // Get the token
    return await axios.delete(`http://localhost:4000/api/manager/tasks/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Get all meetings
export const getMeetings = async () => {
    const token = getToken(); // Get the token
    return await axios.get('http://localhost:4000/api/manager/meetings', {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Create a new meeting
export const createMeeting = async (meetingData) => {
    const token = getToken(); // Get the token
    return await axios.post('http://localhost:4000/api/manager/meetings', meetingData, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Update a meeting
export const updateMeeting = async (id, meetingData) => {
    const token = getToken(); // Get the token
    return await axios.put(`http://localhost:4000/api/manager/meetings/${id}`, meetingData, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Delete a meeting
export const deleteMeeting = async (id) => {
    const token = getToken(); // Get the token
    return await axios.delete(`http://localhost:4000/api/manager/meetings/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Get all teams
export const getTeams = async () => {
    const token = getToken(); // Get the token
    return await axios.get('http://localhost:4000/api/manager/teams', {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Create a new team
export const createTeam = async (teamData) => {
    const token = getToken(); // Get the token
    return await axios.post('http://localhost:4000/api/manager/teams', teamData, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Update a team
export const updateTeam = async (id,teamData) => {
    const token = getToken(); // Get the token
    return await axios.put(`http://localhost:4000/api/manager/teams/${id}`, teamData, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};

// Delete a team
export const deleteTeam = async (id) => {
    const token = getToken(); // Get the token
    return await axios.delete(`http://localhost:4000/api/manager/teams/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    });
};