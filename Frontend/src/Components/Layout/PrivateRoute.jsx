/* import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Route
            {...rest}
            element={isAuthenticated ? element : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute; */
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');
    let userRole = null;

    if (token) {
        // Decode the token to get the user role
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        userRole = decodedToken.role; // Assuming the role is stored in the token
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (userRole !== role) {
        return <Navigate to="/notfound" />; // Redirect to NotFound if the role doesn't match
    }

    return children; // Render the child components if authenticated and role matches
};

export default PrivateRoute;