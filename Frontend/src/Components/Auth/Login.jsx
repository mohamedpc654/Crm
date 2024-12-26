import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth'; // Adjust the import based on your structure

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            localStorage.setItem('token', response.data.token);
            const role = response.data.user.role; // Assuming the role is returned in the response

            // Redirect based on user role
            if (role === 'Admin') {
                navigate('/api/admin');
            } else if (role === 'Manager') {
                navigate('/api/manager');
            } else if (role === 'Employee') {
                navigate('/api/employee');
            }
            window.location.reload(); // This will refresh the entire page

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
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
                <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;