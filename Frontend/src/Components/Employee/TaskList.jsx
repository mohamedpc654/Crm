import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null); // State for error handling
    const [editingTaskId, setEditingTaskId] = useState(null); // Track which task is being edited
    const [updatedStatus, setUpdatedStatus] = useState(''); // Track updated status
    const [notes, setNotes] = useState(''); // Track notes for the task

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from local storage
                const response = await axios.get('http://localhost:4000/api/employee/tasks', {
                    headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
                });
                setTasks(response.data);
            } catch (err) {
                setError('Failed to fetch tasks.'); // Set error message if the request fails
            }
        };
        fetchTasks();
    }, []);

    const handleEditClick = (task) => {
        setEditingTaskId(task._id); // Set the task ID to edit
        setUpdatedStatus(task.status); // Set the current status for editing
        setNotes(task.notes.join('\n')); // Set existing notes for editing
    };

    const handleStatusChange = (e) => {
        setUpdatedStatus(e.target.value); // Update the status
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value); // Update the notes
    };

    const handleUpdateTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token'); // Get the token from local storage
            await axios.put(`http://localhost:4000/api/employee/tasks/${taskId}`, {
                status: updatedStatus,
                notes: notes.split('\n'), // Convert notes to an array
            }, {
                headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
            });
            setTasks(tasks.map(task => (task._id === taskId ? { ...task, status: updatedStatus, notes: notes.split('\n') } : task))); // Update the task in the state
            setEditingTaskId(null); // Reset editing task ID
            setUpdatedStatus(''); // Reset updated status
            setNotes(''); // Reset notes
            toast.success('Task  updated successfully!')
        } catch (err) {
            toast.error('Error update Task')
            setError('Failed to update task.'); // Set error message if the request fails
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Deadline</th>
                        <th className="border px-4 py-2">Notes</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td className="border px-4 py-2">{task.title}</td>
                            <td className="border px-4 py-2">
                                {editingTaskId === task._id ? (
                                    <select value={updatedStatus} onChange={handleStatusChange} className="border border-gray-300 p-1">
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                ) : (
                                    task.status
                                )}
                            </td>
                            <td className="border px-4 py-2">{new Date(task.deadline).toLocaleDateString()}</td>
                            <td className="border px-4 py-2">
                                {editingTaskId === task._id ? (
                                        <textarea
                                            value={notes}
                                            onChange={handleNotesChange}
                                            className="border border-gray-300 p-1"
                                        />
                                    ) : (
                                        task.notes.join(', ')
                                    )}
                            </td>
                            <td className="border px-4 py-2">
                                {editingTaskId === task._id ? (
                                    <button onClick={() => handleUpdateTask(task._id)} className="bg-blue-500 text-white px-2 py-1">Save</button>
                                ) : (
                                    <button onClick={() => handleEditClick(task)} className="bg-yellow-500 text-white px-2 py-1">Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;