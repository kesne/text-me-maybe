import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import auth from './utils/auth';

export default function PrivateRoute({
    children,
    ...rest
}: RouteProps) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.get() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
