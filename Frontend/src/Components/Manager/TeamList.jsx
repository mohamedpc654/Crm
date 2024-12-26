import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const TeamList = () => {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/manager/teams', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTeams(response.data);
        } catch (err) {
            setError('Failed to fetch teams.');
        }
    };

    const handleDeleteTeam = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:4000/api/manager/teams/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTeams(teams.filter(team => team._id !== id));            
            toast.success('Team deleted successfully.');

        } catch (err) {
            setError('Failed to delete team.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Team List</h2>
            {error && <p className="text-red-500">{error}</p>}
            <Link to="/api/manager/create-team" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4 inline-block">Create New Team</Link>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Team Name</th>
                        <th className="border border-gray-300 p-2">Members</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{team.name}</td>
                            <td className="border border-gray-300 p-2">
                                {team.members.map(member => (
                                    <span key={member._id}> -{member.username} </span>
                                ))}
                            </td>
                            <td className="border border-gray-300 p-2">
                                <Link to={`/api/manager/teams/${team._id}`} className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 mr-2">Edit</Link>
                                <button onClick={() => handleDeleteTeam(team._id)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamList;