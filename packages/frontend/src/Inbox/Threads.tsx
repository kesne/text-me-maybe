import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
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

export const THREADS = gql`
    query Threads {
        threads {
            id
            recipient
            phoneNumber
            updatedAt
            lastMessage {
                id
                body
            }
        }
    }
`;

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
    const { data, loading } = useQuery(THREADS);

    if (loading) {
        return <div>Loading...</div>;
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
