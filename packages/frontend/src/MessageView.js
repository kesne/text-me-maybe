import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Threads from './Threads';
import Messages from './Messages';
import CreateThread from './CreateThread';
import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 320;

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
    contentWrapper: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    toolbar: theme.mixins.toolbar
}));

export default function MessageView() {
    const classes = useStyles();

    return (
        <>
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
                <div className={classes.contentWrapper}>
                    <Switch>
                        <Route path="/threads/create">
                            <CreateThread />
                        </Route>
                        <Route path="/threads/:id">
                            <Messages />
                        </Route>
                        <Route>Where are you??</Route>
                    </Switch>
                </div>
            </main>
        </>
    );
}
