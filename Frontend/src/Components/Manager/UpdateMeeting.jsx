import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateMeeting = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // For redirecting after update
    const [meeting, setMeeting] = useState({ title: '', agenda: '', participants: [], date: '' });
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMeeting();
        fetchEmployees();
    }, [id]);

    const fetchMeeting = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:4000/api/manager/meetings/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMeeting(response.data);
        } catch (err) {
            setError('Failed to fetch meeting details.');
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
            await axios.put(`http://localhost:4000/api/manager/meetings/${id}`, meeting, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Meeting updated successfully!'); // Success notification

            navigate('/api/manager'); // Redirect to meeting list after update
        } catch (err) {
            toast.error('Failed to update meeting'); // Success notification

            setError('Failed to update meeting.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Update Meeting</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                <input 
                    type="text" 
                    name="title" 
                    value={meeting.title} 
                    onChange={handleChange} 
                    required 
                    className="border border-gray-300 p-2 w-full mb-2 rounded" 
                />
                <textarea 
                    name="agenda" 
                    value={meeting.agenda} 
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
                        <option key={employee._id} value={employee._id} selected={meeting.participants.includes(employee._id)}>
                            {employee.username}
                        </option>
                    ))}
                </select>
                <input 
                    type="date" 
                    name="date" 
                    value={meeting.date ? new Date(meeting.date).toISOString().split('T')[0 ] : ''} 
                    onChange={handleChange} 
                    required 
                    className="border border-gray-300 p-2 w-full mb-2 rounded" 
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Meeting</button>
            </form>
        </div>
    );
};

export default UpdateMeeting;