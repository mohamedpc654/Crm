// src/Components/Layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
    return (
        <div className="bg-gray-800 text-white w-64 h-full fixed">
            <div className="p-4">
                <h2 className="text-xl font-bold">Dashboard</h2>
            </div>
            <ul className="mt-4">
                {role === 'Admin' && (
                    <>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/api/admin/users">User  Management</Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/api/admin/CreateUser ">Create User</Link>
                        </li>
                    </>
                )}
                {role === 'Manager' && (
                    <>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/api/manager/teams">Team Management</Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/api/manager/tasks">Task Management</Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/api/manager/meetings">Meeting Management</Link>
                        </li>
                    </>
                )}
                {role === 'Employee' && (
                    <>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/api/employee/tasks">My Tasks</Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/api/employee/meetings">My Meetings</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;