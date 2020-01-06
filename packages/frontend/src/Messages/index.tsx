import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import Message from './Message';
import SendMessage from './SendMessage';
import { useMessagesQuery } from '../queries';
import FetchMore from './FetchMore';
import Header from './Header';
import YouAre from './YouAre';
import ThreadEnded from './ThreadEnded';

export default function Messages() {
    const [classes, cx] = useStyles(() => ({
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
        return <Redirect to="/inbox" />;
    }

    return (
        <div className={cx(classes.wrapper)}>
            <Header thread={data.thread} />
            <div className={cx(classes.container)}>
                {data.thread.messages.map(message => (
                    <Message key={message.id} message={message} />
                ))}
                <FetchMore onMore={() => {}} />
                <YouAre phoneNumber={data.thread.number} createdAt={data.thread.createdAt} />
            </div>

            {data.thread.ended ? (
                <ThreadEnded />
            ) : (
                <SendMessage threadID={threadID} refetch={refetch} />
            )}
        </div>
    );
}
