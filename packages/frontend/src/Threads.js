import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const THREADS = gql`
    query Threads {
        threads {
            id
            recipient
            phoneNumber
            updatedAt
        }
    }
`;

export default function Threads() {
    const { data, error, loading } = useQuery(THREADS);
    console.log(error);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <List>
            {data.threads.map(thread => (
                <ListItem button>
                    <ListItemText
                        // TODO: Phone number format.
                        primary={thread.recipient}
                        // TODO: Get last message.
                        secondary="U up?..."
                    />
                </ListItem>
            ))}
        </List>
    );
}
