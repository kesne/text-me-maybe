import React, { useContext } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import HasUserContext from './HasUserContext';

type Props = (
    | {
          authed: true;
          unauthed?: never;
      }
    | {
          authed?: never;
          unauthed: true;
      }
) &
    RouteProps;

export default function AuthenticatedRoute({ authed, unauthed, children, ...rest }: Props) {
    const { hasUser } = useContext(HasUserContext);

    let shouldRedirect = false;
    if (authed && !hasUser) {
        shouldRedirect = true;
    } else if (unauthed && hasUser) {
        shouldRedirect = true;
    }

    const redirectLocation = hasUser ? '/inbox' : '/signin';

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !shouldRedirect ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: redirectLocation,
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
