import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser  } from "../../api/admin"; // Ensure deleteUser  is defined in admin.js
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { toast } from 'react-toastify';

const UserList = () => {
    const [users, setUsers] = useState([]); // Ensure initial state is an empty array
    const [error, setError] = useState(null); // State to handle errors
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers(); // Use the getUsers function to fetch users
                setUsers(response.data); // Set users to the response data
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to fetch users.'); // Set error message
            }
        };
        fetchUsers();
    }, []);

    const handleEditUser  = (id) => {
        navigate(`/api/admin/users/${id}/edit`); // Redirect to the Update User page with user ID
    };

    const handleDeleteUser  = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await deleteUser (id); // Call the deleteUser  function
                setUsers(users.filter(user => user._id !== id)); // Update the user list after deletion
                toast.success('User  deleted successfully!'); // Success notification

            } catch (err) {
                toast.error('Failed to delete user.'); // Error notification

                console.error('Error deleting user:', err);
                setError('Failed to delete user.'); // Set error message
            }
        }
    };

    if (error) {
        if (error.response && error.response.status === 401) {
            // Redirect to login if unauthorized
            window.location.href = '/login';
        }
        return <div className="p-6 text-red-500">{error}</div>; // Display error message if any
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">User  List</h2>
            <button 
                onClick={() => navigate('/api/admin/CreateUser ')} 
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
            >
                Create User
            </button>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                                <td className="border px-4 py-2">
                                    <button 
                                        onClick={() => handleEditUser (user._id)} // Call handleEditUser  with user ID
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteUser (user._id)} // Call handleDeleteUser  with user ID
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="border px-4 py-2 text-center">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;