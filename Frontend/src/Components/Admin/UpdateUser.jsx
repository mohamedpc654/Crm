import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser  } from "../../api/admin"; // Ensure you have a function to get user by ID
import { toast } from 'react-toastify';

const UpdateUser  = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // For redirecting after update
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('Employee');

    useEffect(() => {
        const fetchUser  = async () => {
            try {
                const response = await getUserById(id); // Fetch user data
                setUsername(response.data.username || '');
                setRole(response.data.role || 'Employee');
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser ();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser (id, { username, role }); // Update user
            toast.success('User  updated successfully!'); // Success notification
            navigate('/api/admin/users'); // Redirect to user list after update
        } catch (error) {
            toast.error('Failed to update user.'); // Error notification
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Update User</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 w-full mb-4"
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border p-2 w-full mb-4"
                >
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-700">
                    Update User
                </button>
            </form>
        </div>
    );
};

export default UpdateUser ;