import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Message from './Message';
import SendMessage from './SendMessage';
import { useMessagesQuery } from '../queries';
import FetchMore from './FetchMore';
import Header from './Header';
import YouAre from './YouAre';
import ThreadEnded from './ThreadEnded';

const useStyles = makeStyles(() => ({
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowY: 'auto'
    }
}));

export default function Messages() {
    const classes = useStyles();
    const { id } = useParams() as Record<string, string>;
    const threadID = Number(id);

    const { loading, data, error, refetch } = useMessagesQuery({
        variables: {
            threadID
        }
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Un oh! {error}</div>;
    }

    if (!data.thread) {
        return <div>Un oh, no thread!</div>;
    }

    return (
        <div className={classes.wrapper}>
            <Header thread={data.thread} />
            <div className={classes.container}>
                {data.thread.messages.map(message => (
                    <Message key={message.id} message={message} />
                ))}
                <FetchMore onMore={() => {}} />
                <YouAre phoneNumber={data.thread.phoneNumber} createdAt={data.thread.createdAt} />
            </div>

            {data.thread.ended ? (
                <ThreadEnded />
            ) : (
                <SendMessage threadID={threadID} refetch={refetch} />
            )}
        </div>
    );
}
