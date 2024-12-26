import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const MeetingList = () => {
    const [meetings, setMeetings] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMeetings();
        fetchEmployees();
    }, []);

    const fetchMeetings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/manager/meetings', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMeetings(response.data);
        } catch (err) {
            setError('Failed to fetch meetings.');
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

    const handleDeleteMeeting = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:4000/api/manager/meetings/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMeetings(meetings.filter(meeting => meeting._id !== id));            
            toast.success('Meeting deleted successfully.');

        } catch (err) {
            toast.error('Failed to delete meeting')
            setError('Failed to delete meeting.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Meeting List</h2>
            {error && <p className="text-red-500">{error}</p>}
            <Link to="/api/manager/create-meeting" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4 inline-block">Create New Meeting</Link>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Title</th>
                        <th className="border border-gray-300 p-2">Agenda</th>
                        <th className="border border-gray-300 p-2">Participants</th>
                        <th className="border border-gray-300 p-2">Date</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {meetings.map(meeting => (
                        <tr key={meeting._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{meeting.title}</td>
                            <td className="border border-gray-300 p-2">{meeting.agenda}</td>
                            <td className="border border-gray-300 p-2">
                                {meeting.participants.map(participant => (
                                    <span key={participant._id}>-{participant.username}</span>
                                ))}
                            </td>
                            <td className="border border-gray-300 p-2">{new Date(meeting.date).toLocaleDateString()}</td>
                            <td className="border border-gray-300 p-2">
                                <Link to={`/api/manager/updatemeeting/${meeting._id}`} className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 mr-2">Edit</Link>
                                <button onClick={() => handleDeleteMeeting(meeting._id)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MeetingList;