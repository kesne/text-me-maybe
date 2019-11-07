import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>Uh oh... {error}</div>
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
                {data.threads.map((thread: any) => (
                    <ListItem key={thread.id} component={Link} to={`/threads/${thread.id}`} button>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            // TODO: Phone number format.
                            primary={thread.recipient}
                            secondary={thread.lastMessage ? thread.lastMessage.body : null}
                        />
                    </ListItem>
                ))}
            </List>
            {creating && <CreateThread onClose={() => setCreating(false)} />}
        </div>
    );
}
