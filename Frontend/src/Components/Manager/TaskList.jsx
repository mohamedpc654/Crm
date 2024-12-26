import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
        fetchEmployees();
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/manager/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data);
        } catch (err) {
            setError('Failed to fetch tasks.');
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

    const handleDeleteTask = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:4000/api/manager/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            setTasks(tasks.filter(task => task._id !== id));
            toast.success('Task deleted successfully.');
        } catch (err) {
            setError('Failed to delete task.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Task List</h2>
            {error && <p className="text-red-500">{error}</p>}
            <Link to="/api/manager/createtasks" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4 inline-block">Create New Task</Link>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Title</th>
                        <th className="border border-gray-300 p-2">Description</th>
                        <th className="border border-gray-300 p-2">Assigned To</th>
                        <th className="border border-gray-300 p-2">Deadline</th>
                        <th className="border border-gray-300 p-2">Priority</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{task.title}</td>
                            <td className="border border-gray-300 p-2">{task.description}</td>
                            <td className="border border-gray-300 p-2">{task.assignedTo ? task.assignedTo.username : 'Unassigned'}</td>
                            <td className="border border-gray-300 p-2">{new Date(task.deadline).toLocaleDateString()}</td>
                            <td className="border border-gray-300 p-2">{task.priority}</td>
                            <td className="border border-gray-300 p-2">
                                <Link to={`/api/manager/updatetask/${task._id}`} className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 mr-2">Edit</Link>
                                <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;