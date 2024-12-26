import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateTeam = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // For redirecting after update
    const [team, setTeam] = useState({ name: '', members: [] });
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTeam();
        fetchEmployees();
    }, [id]);

    const fetchTeam = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:4000/api/manager/teams/${id}`, {
                headers
                : { Authorization: `Bearer ${token}` },
            });
            setTeam(response.data);
        } catch (err) {
            setError('Failed to fetch team.');
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
        setTeam({ ...team, [name]: value });
    };

    const handleMemberChange = (e) => {
        const options = e.target.options;
        const selectedMembers = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedMembers.push(options[i].value);
            }
        }
        setTeam({ ...team, members: selectedMembers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:4000/api/manager/teams/${id}`, team, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Team  updated successfully!'); // Success notification

            navigate('/api/manager');
        } catch (err) {
            toast.error('Failed to update team'); // Success notification

            setError('Failed to update team.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Update Team</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Team Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={team.name}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Select Members:</label>
                    <select
                        multiple
                        value={team.members}
                        onChange={handleMemberChange}
                        className="border border-gray-300 p-2 w-full"
                    >
                        {employees.map(employee => (
                            <option key={employee._id} value={employee._id}>
                                {employee.username}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Team</button>
            </form>
        </div>
    );
};

export default UpdateTeam;