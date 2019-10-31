import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Threads from './Threads';
import Messages from './Messages';
import SendMessage from './SendMessage';
import client from './client';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    messages: {
        flexGrow: 1,
        overflowY: 'auto'
    },
    toolbar: theme.mixins.toolbar
}));

export default function ClippedDrawer() {
    const classes = useStyles();

    return (
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
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.toolbar} />
                    <Threads />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className={classes.messages}>
                        <Messages />
                    </div>
                    <SendMessage />
                </main>
            </div>
        </ApolloProvider>
    );
}
