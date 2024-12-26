import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateMeeting = () => {
    const [meeting, setMeeting] = useState({ title: '', agenda: '', participants: [], date: '' });
    const [employees, setEmployees] = useState([]); // State for employees
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchEmployees(); // Fetch employees when the component mounts
    }, []);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployees(response.data); // Assuming the response contains an array of employees
        } catch (err) {
            setError('Failed to fetch employees.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeeting({ ...meeting, [name]: value });
    };

    const handleParticipantChange = (e) => {
        const options = e.target.options;
        const selectedParticipants = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedParticipants.push(options[i].value);
            }
        }
        setMeeting({ ...meeting, participants: selectedParticipants });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:4000/api/manager/meetings', meeting, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Meeting Created successfully!'); // Success notification

            navigate('/api/manager'); // Redirect to meeting list after creation
        } catch (err) {
            toast.error('Failed to create meeting'); // Success notification

            setError('Failed to create meeting.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create New Meeting</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Meeting Title" 
                    onChange={handleChange} 
                    required 
                    className="border border-gray-300 p-2 w-full mb-2 rounded" 
                />
                <textarea 
                    name="agenda" 
                    placeholder="Agenda" 
                    onChange={handleChange} 
                    required 
                    className="border border-gray-300 p-2 w-full mb-2 rounded" 
                />
                <select 
                    multiple 
                    name="participants" 
                    onChange={handleParticipantChange} 
                    className="border border-gray-300 p-2 w-full mb-2 rounded"
                >
                    {employees.map(employee => (
                        <option key={employee._id} value={employee._id}>{employee.username}</option>
                    ))}
                </select>
                <input 
                    type="date" 
                    name="date" 
                    onChange={handleChange} 
                    required 
                    className="border border-gray-300 p-2 w-full mb-2 rounded" 
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Create Meeting</button>
            </form>
        </div>
    );
};

export default CreateMeeting;