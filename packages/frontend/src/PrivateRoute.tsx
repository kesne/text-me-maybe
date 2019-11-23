import React, { useContext } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import HasUserContext from './HasUserContext';

export default function PrivateRoute({ children, ...rest }: RouteProps) {
    const { hasUser } = useContext(HasUserContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                hasUser ? (
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
