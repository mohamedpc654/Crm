import React, { useState } from 'react';
import axios from 'axios';
import {createUser} from "../../api/admin"
import { toast } from 'react-toastify';

const CreateUser  = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Admin');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser( { username, password, role });
            // Optionally redirect or show success message
            console.log('User created successfully');
            toast.success('User  created successfully!'); // Success notification

        } catch (error) {
            console.error(error);
            toast.error('Failed to create user.'); // Error notification

        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Create User</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 w-full mb-4"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUser ; 