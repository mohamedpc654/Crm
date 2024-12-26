import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MeetingList = () => {
    const [meetings, setMeetings] = useState([]);
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from local storage
                const response = await axios.get('http://localhost:4000/api/manager/meetings', {
                    headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
                });
                setMeetings(response.data);
            } catch (err) {
                setError('Failed to fetch meetings.'); // Set error message if the request fails
            }
        };
        fetchMeetings();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Meetings</h2>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Participants</th>
                    </tr>
                </thead>
                <tbody>
                    {meetings.map((meeting) => (
                        <tr key={meeting._id}>
                            <td className="border px-4 py-2">{meeting.title}</td>
                            <td className="border px-4 py-2">{new Date(meeting.date).toLocaleString()}</td>
                            <td className="border px-4 py-2">{meeting.participants.map(participant => participant.username).join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MeetingList;