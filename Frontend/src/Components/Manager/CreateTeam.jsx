import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateTeam = () => {
    const [team, setTeam] = useState({ name: '', members: [] });
    const [employees, setEmployees] = useState([]); // State for employees
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
            await axios.post('http://localhost:4000/api/manager/teams', team, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Team Created successfully!'); // Success notification

            navigate('/api/manager'); // Redirect to team list after creation
        } catch (err) {
            toast.error('Failed to Create Team'); // Success notification

            setError('Failed to create team.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create New Team</h2>
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
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Create Team</button>
            </form>
        </div>
    );
};

export default CreateTeam;