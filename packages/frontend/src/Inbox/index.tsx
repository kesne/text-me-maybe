import React from 'react';
import { Switch, Route } from 'react-router-dom';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import Threads from './Threads';
import Messages from '../Messages';

export default function Inbox() {
    const [classes, cx] = useStyles(theme => ({
        inbox: {
            flex: 1,
            display: 'flex',
            overflow: 'hidden',
            flexDirection: 'row'
        },
        drawer: {
            width: 320,
            padding: theme.unit * 2
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1
        },
        contentWrapper: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            padding: theme.unit * 2
        }
    }));

    return (
        <div className={cx(classes.inbox)}>
            <div className={cx(classes.drawer)}>
                <Threads />
            </div>
            <main className={cx(classes.content)}>
                <div className={cx(classes.contentWrapper)}>
                    <Switch>
                        <Route path="/inbox/:id">
                            <Messages />
                        </Route>
                        <Route>
                            <div>Emoty</div>
                        </Route>
                    </Switch>
                </div>
            </main>
        </div>
    );
}
