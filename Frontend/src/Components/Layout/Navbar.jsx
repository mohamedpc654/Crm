import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Navbar = ({ isAuthenticated, username, onLogout }) => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-white text-lg font-bold">TechTitans CRM</Link>
                <div>
                    {isAuthenticated ? (
                        <>
                            <span className="text-white px-4">Welcome, {username}</span>
                            <button onClick={onLogout} className="text-white px-4">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="text-white px-4">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;