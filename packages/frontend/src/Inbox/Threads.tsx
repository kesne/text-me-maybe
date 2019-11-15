import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';
import CreateThread from './CreateThread';
import { useThreadsQuery } from '../queries';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        flex: 1
    },
    buttonContainer: {
        position: 'sticky',
        padding: theme.spacing(),
        bottom: 0,
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

export default function Threads() {
    const classes = useStyles();
    const [creating, setCreating] = useState(false);
    const { data, error, loading } = useThreadsQuery();
    const history = useHistory();
    const match = useRouteMatch('/threads/:id');

    useEffect(() => {
        if (data && data.threads.length && !match) {
            history.replace(`/threads/${data.threads[0].id}`);
        }
    }, [data, match, history]);

    const params: Record<string, string> = match ? match.params : {};

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>Uh oh... {error}</div>;
    }

    return (
        <div className={classes.container}>
            <List>
                <ListItem onClick={() => setCreating(true)} button>
                    <ListItemAvatar>
                        <Avatar>
                            <Fab color="primary">
                                <AddIcon />
                            </Fab>
                        </Avatar>
                    </ListItemAvatar>

                    <ListItemText primary="New conversation" />
                </ListItem>
                {data.threads.map(thread => (
                    <ListItem
                        key={thread.id}
                        selected={Number(params.id) === thread.id}
                        component={Link}
                        to={`/threads/${thread.id}`}
                        button
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            // TODO: Phone number format.
                            primary={thread.name}
                            secondary={thread.lastMessage ? thread.lastMessage.body : null}
                        />
                    </ListItem>
                ))}
            </List>
            {creating && <CreateThread onClose={() => setCreating(false)} />}
        </div>
    );
}
