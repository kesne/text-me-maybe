import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';

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
        justifyContent: 'flex-end',
    }
}));

export default function Threads() {
    const classes = useStyles();
    const { data, error, loading } = useQuery(THREADS);
    console.log(error);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={classes.container}>
            <List>
                {data.threads.map(thread => (
                    <ListItem key={thread.id} component={Link} to={`/threads/${thread.id}`} button>
                        <ListItemText
                            // TODO: Phone number format.
                            primary={thread.recipient}
                            secondary={thread.lastMessage ? thread.lastMessage.body : null}
                        />
                    </ListItem>
                ))}
            </List>
            <div className={classes.buttonContainer}>
                <Fab component={Link} to="/threads/create" color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        </div>
    );
}
