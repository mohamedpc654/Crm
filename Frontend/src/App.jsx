// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Login from "./Components/Auth/Login";
import PrivateRoute from "./Components/Layout/PrivateRoute";
import Navbar from "./Components/Layout/Navbar";
import Sidebar from "./Components/Layout/Sidebar"; // Import Sidebar
import UserList from "./Components/Admin/UserList";
import UpdateUser  from "./Components/Admin/UpdateUser";
import CreateUser  from "./Components/Admin/CreateUser";
import CreateMeeting from "./Components/Manager/CreateMeeting"; 
import MeetingList from "./Components/Manager/MeetingList"; 
import CreateTask from "./Components/Manager/CreateTask"; 
import TeamList from "./Components/Manager/TeamList"; 
import CreateTeam from "./Components/Manager/CreateTeam"; 
import TaskList from "./Components/Employee/TaskList"; 
import TaskList2 from "./Components/Manager/TaskList";
import MeetingListEmployee from "./Components/Employee/MeetingList"; 
import UpdateTask from "./Components/Manager/UpdateTask";
import UpdateMeeting from "./Components/Manager/UpdateMeeting";
import UpdateTeam from "./Components/Manager/UpdateTeam";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null); // Add role state

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setUsername(decodedToken.username);
                setRole(decodedToken.role); // Set role from token
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error decoding token:', error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUsername(null);
        setRole(null); // Reset role
        window.location.href = '/login';
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout} />
            <div className="flex">
                <Sidebar role={role} /> {/* Add Sidebar here */}
                <div className="flex-grow ml-64"> {/* Adjust margin to accommodate sidebar */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        {/* Admin Routes */}
                        <Route path="/api/admin" element={<PrivateRoute role="Admin"><AdminDashboard /></PrivateRoute>} />
                        <Route path="/api/admin/users" element={<UserList />} />
                        <Route path="/api/admin/users/:id/edit" element={<UpdateUser />} />
                        <Route path="/api/admin/CreateUser" element={<CreateUser />} />
                        {/* Manager Routes */}
                        <Route path="/api/manager" element={<PrivateRoute role="Manager"><ManagerDashboard /></PrivateRoute>} />
                        <Route path="/api/manager/teams" element={<TeamList />} />
                        <Route path="/api/manager/teams/:id" element={<UpdateTeam />} />
                        <Route path="/api/manager/updatetask/:id" element={<UpdateTask />} />
                        <Route path="/api/manager/meetings" element={<MeetingList />} />
                        <Route path="/api/manager/updatemeeting/:id" element={<UpdateMeeting />} />
                        <Route path="/api/manager/create-meeting" element={<CreateMeeting />} />
                        <Route path="/api/manager/createtasks" element={<CreateTask />} />
                        <Route path="/api/manager/tasks" element={<TaskList2 />} />
                        <Route path="/api/manager/create-team" element={<CreateTeam />} />

                        {/* Employee Routes */}
                        <Route path="/api/employee" element={<PrivateRoute role="Employee"><EmployeeDashboard /></PrivateRoute>} />
                        <Route path="/api/employee/tasks" element={<TaskList />} />
                        <Route path="/api/employee/meetings" element={<MeetingListEmployee />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
            <ToastContainer />
        </Router>
    );
};

export default App;