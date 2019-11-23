import React, { useState, useMemo } from 'react';
import Cookie from 'js-cookie';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import client from './utils/client';
import Header from './Header';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import MessageView from './Inbox';
import PrivateRoute from './PrivateRoute';
import Account from './Account';
import OnboardTOTP from './Auth/OnboardTOTP';
import HasUserContext from './HasUserContext';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    contentWrapper: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    content: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    toolbar: theme.mixins.toolbar
}));

const HAS_USER_COOKIE = 'hasUser';
const HAS_USER_VALUE = '1';

export default function App() {
    const classes = useStyles();
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
        <HasUserContext.Provider value={contextValue}>
            <Router>
                <ApolloProvider client={client}>
                    <div className={classes.root}>
                        <CssBaseline />
                        <Header />
                        <div className={classes.contentWrapper}>
                            <div className={classes.toolbar} />
                            <div className={classes.content}>
                                <Switch>
                                    <Route path="/signin">
                                        <SignIn />
                                    </Route>
                                    <Route path="/signup">
                                        <SignUp />
                                    </Route>
                                    <PrivateRoute path="/onboard-totp">
                                        <OnboardTOTP />
                                    </PrivateRoute>
                                    <PrivateRoute path="/threads">
                                        <MessageView />
                                    </PrivateRoute>
                                    <PrivateRoute path="/account">
                                        <Account />
                                    </PrivateRoute>
                                    <Route>
                                        <div>Where are you?</div>
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </ApolloProvider>
            </Router>
        </HasUserContext.Provider>
    );
}
