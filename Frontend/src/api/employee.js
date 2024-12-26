import axios from 'axios';

// Get assigned tasks for the employee
export const getAssignedTasks = async () => {
    return await axios.get('http://localhost:4000/api/employee/tasks');
};

// Get meetings for the employee
export const getMeetings = async () => {
    return await axios.get('http://localhost:4000/api/employee/meetings'); // Adjust endpoint as needed
};