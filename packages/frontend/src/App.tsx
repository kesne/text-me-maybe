import React, { useState, useMemo } from 'react';
import Cookie from 'js-cookie';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Layout } from 'antd';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import client from './utils/client';
import Header from './Header';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';
import Home from './Home';
import Inbox from './Inbox';
import AuthenticatedRoute from './AuthenticatedRoute';
import Account from './Account';
import HasUserContext from './HasUserContext';

const HAS_USER_COOKIE = 'hasUser';
const HAS_USER_VALUE = '1';

export default function App() {
    const [classes, cx] = useStyles(() => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            // TODO: This should probably be min-height,
            // we just need to sort out the messages view.
            height: '100vh'
        },
        contentWrapper: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1
        },
        content: {
            display: 'flex',
            flex: 1,
            overflow: 'auto'
        }
    }));
    const [hasUser, setHasUser] = useState(
        Cookie.get(HAS_USER_COOKIE) === HAS_USER_VALUE ? true : false
    );
    const contextValue = useMemo(
        () => ({
            hasUser,
            setHasUser: (value: boolean) => {
                // TODO: Remotely sign-out:
                value ? Cookie.set(HAS_USER_COOKIE, '1') : Cookie.remove(HAS_USER_COOKIE);
                setHasUser(value);
            }
        }),
        [hasUser, setHasUser]
    );

    return (
        <Layout>
            <HasUserContext.Provider value={contextValue}>
                <Router>
                    <ApolloProvider client={client}>
                        <div className={cx(classes.root)}>
                            <Header />
                            <Switch>
                                <AuthenticatedRoute unauthed path="/signin">
                                    <SignIn />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute unauthed path="/signup">
                                    <SignUp />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute unauthed path="/forgot">
                                    <ForgotPassword />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute unauthed path="/reset-password/:uuid">
                                    <ResetPassword />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute authed path="/inbox">
                                    <Inbox />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute authed path="/account">
                                    <Account />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute unauthed path="/" exact>
                                    <Home />
                                </AuthenticatedRoute>
                                <Route>
                                    <div>Where are you?</div>
                                </Route>
                            </Switch>
                        </div>
                    </ApolloProvider>
                </Router>
            </HasUserContext.Provider>
        </Layout>
    );
}
