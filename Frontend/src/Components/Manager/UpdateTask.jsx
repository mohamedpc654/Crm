import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateTask = () => {
    const { id } = useParams(); // Get the task ID from the URL
    const [task, setTask] = useState({ title: '', description: '', assignedTo: '', deadline: '', priority: 'Normal' });
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        fetchTask();
        fetchEmployees(); // Fetch employees for the dropdown
    }, [id]);

    const fetchTask = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:4000/api/manager/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTask(response.data);
        } catch (err) {
            setError('Failed to fetch task.');
        }
    };

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployees(response.data);
        } catch (err) {
            setError('Failed to fetch employees.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:4000/api/manager/tasks/${id}`, task, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Task  updated successfully!'); // Success notification

            navigate('/api/manager'); // Redirect to task list after update
        } catch (err) {
            toast.error('Failed to upodate task'); // Success notification

            setError('Failed to update task.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Update Task</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Task Title" value={task.title} onChange={handleChange} required className="border border-gray-300 p-2 w-full mb-2 rounded" />
                <textarea name="description" placeholder="Task Description" value={task.description} onChange={handleChange} required className="border border-gray-300 p-2 w-full mb-2 rounded" />
                <select name="assignedTo" value={task.assignedTo} onChange={handleChange} required className="border border-gray-300 p-2 w-full mb-2 rounded">
                    <option value="">Select Employee</option>
                    {employees.map(employee => (
                        <option key={employee._id} value={employee._id}>{employee.username}</option>
                    ))}
                </select>
                <input type="date" name="deadline" value={task.deadline} onChange={handleChange} required className="border border-gray-300 p-2 w-full mb-2 rounded" />
                <select name="priority" value={task.priority} onChange={handleChange} className="border border-gray-300 p-2 w-full mb-2 rounded">
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTask;