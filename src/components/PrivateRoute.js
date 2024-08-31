import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    userRole === 'admin' ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/user-dashboard" />
                    )
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
