import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import Message from './Message';

export const MESSAGES = gql`
    query {
        messages {
            body
        }
    }
`;

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column-reverse'
    }
}));

export default function Messages() {
    return 'todo';
    const classes = useStyles();
    const { loading, data } = useQuery(MESSAGES);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={classes.container}>
            {data.messages.reverse().map(message => (
                <Message message={message} />
            ))}
        </div>
    );
}
