// src/pages/ManagerDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerDashboard = () => {
    const [teams, setTeams] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                
                // Fetch Teams
                const teamsResponse = await axios.get('http://localhost:4000/api/manager/teams', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTeams(teamsResponse.data);

                // Fetch Tasks
                const tasksResponse = await axios.get('http://localhost:4000/api/manager/tasks', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(tasksResponse.data);

                // Fetch Meetings
                const meetingsResponse = await axios.get('http://localhost:4000/api/manager/meetings', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMeetings(meetingsResponse.data);
            } catch (err) {
                setError('Failed to fetch data.');
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">Manager Dashboard</h1>
            {error && <p className="text-red-500">{error}</p>}

            {/* Teams Table */}
            <div className="mt-4">
                <h2 className="text-2xl font-semibold">Teams</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Team Name</th>
                            <th className="border border-gray-300 p-2">Members</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map(team => (
                            <tr key={team._id}>
                                <td className="border border-gray-300 p-2">{team.name}</td>
                                <td className="border border-gray-300 p-2">
                                    {team.members.map(member => (
                                        <span key={member._id}>-{member.username} </span>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tasks Table */}
            <div className="mt-4">
                <h2 className="text-2xl font-semibold">Tasks</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Title</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task._id}>
                                <td className="border border-gray-300 p-2">{task.title}</td>
                                <td className="border border-gray-300 p-2">{task.status}</td>
                                <td className="border border-gray-300 p-2">{new Date(task.deadline).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Meetings Table */}
            <div className="mt-4">
                <h2 className="text-2xl font-semibold">Meetings</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Title</th>
                            <th className="border border-gray-300 p-2">Date</th>
                            <th className="border border-gray-300 p-2">Participants</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.map(meeting => (
                            <tr key={meeting._id}>
                                <td className="border border-gray-300 p-2">{meeting.title}</td>
 <td className="border border-gray-300 p-2">{new Date(meeting.date).toLocaleDateString()}</td>
                                <td className="border border-gray-300 p-2">
                                    {meeting.participants.map(participant => (
                                        <span key={participant._id}>-{participant.username} </span>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerDashboard;