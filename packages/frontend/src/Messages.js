import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import Message from './Message';
import SendMessage from './SendMessage';

export const MESSAGES = gql`
    query Thread($threadID: ID!) {
        thread(threadID: $threadID) {
            id
            messages {
                id
                body
                sender
                createdAt
            }
        }
    }
`;

const useStyles = makeStyles(() => ({
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowY: 'auto',
    }
}));

export default function Messages() {
    const classes = useStyles();
    let { id } = useParams();
    const { loading, data, refetch } = useQuery(MESSAGES, {
        variables: {
            threadID: id
        }
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                {data.thread.messages.map(message => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            <SendMessage threadID={id} refetch={refetch} />
        </div>
    );
}
