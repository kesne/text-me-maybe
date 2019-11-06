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

type MessagesResponse = {
    thread: {
        id: string;
        messages: {
            id: string;
            body: string;
            sender: 'SELF' | 'OTHER';
            createdAt: string;
        }[]
    }
};

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
    const { id } = useParams() as Record<string, string>;

    const { loading, data, error, refetch } = useQuery<MessagesResponse>(MESSAGES, {
        variables: {
            threadID: id
        }
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Un oh! {error}</div>
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
