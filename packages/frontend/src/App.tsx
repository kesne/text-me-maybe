import React from 'react';
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
import Onboard2FA from './Auth/Onboard2FA';

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
        overflow: 'hidden',
    },
    toolbar: theme.mixins.toolbar
}));

export default function App() {
    const classes = useStyles();

    return (
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
                                <PrivateRoute path="/onboard-2fa">
                                    <Onboard2FA />
                                </PrivateRoute>
                                <PrivateRoute path="/threads">
                                    <MessageView />
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
    );
}
