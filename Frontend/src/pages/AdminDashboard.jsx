import React from 'react';
import UserList from '../Components/Admin/UserList';
import CreateUser from '../Components/Admin/CreateUser';
import UpdateUser from '../Components/Admin/UpdateUser';

const AdminDashboard = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <img 
                    src="https://img.freepik.com/free-vector/business-user-cog_78370-7040.jpg?semt=ais_hybrid" 
                    alt="Dashboard Image" 
                    className="w-50 h-auto rounded shadow-md" 
                />
        </div>
    );
};

export default AdminDashboard;