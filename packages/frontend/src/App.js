import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import client from './client';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import MessageView from './MessageView';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    }
}));

export default function App() {
    const classes = useStyles();

    return (
        <Router>
            <ApolloProvider client={client}>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                Text Me Maybe
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signup">
                            <SignUp />
                        </Route>
                        <Route path="/threads">
                            <MessageView />
                        </Route>
                    </Switch>
                </div>
            </ApolloProvider>
        </Router>
    );
}
