import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Button from 'antd/es/button';
import List from '@airbnb/lunar/lib/components/List';
import Loader from '@airbnb/lunar/lib/components/Loader';
import Card from '@airbnb/lunar/lib/components/Card';
import CreateThread from './CreateThread';
import { useThreadsQuery } from '../queries';
import ThreadItem from './ThreadItem';

export default function Threads() {
    const [creating, setCreating] = useState(false);
    const { data, error, loading } = useThreadsQuery();
    const history = useHistory();
    const match = useRouteMatch('/inbox/:id');

    useEffect(() => {
        if (data && data.threads.length && !match) {
            history.replace(`/inbox/${data.threads[0].id}`);
        }
    }, [data, match, history]);

    const params: Record<string, string> = match ? match.params : {};

    if (loading) {
        return <Loader />;
    }

    if (error || !data) {
        return <div>Uh oh... {error}</div>;
    }

    return (
        <Card>
            <List>
                {data.threads.map(thread => (
                    <ThreadItem
                        key={thread.id}
                        id={thread.id}
                        title={thread.name}
                        subtitle={thread.lastMessage ? thread.lastMessage.body : null}
                        seen={thread.lastMessage ? thread.lastMessage.seen : true}
                        selected={Number(params.id) === thread.id}
                    />
                ))}
            </List>
            <div
                style={{
                    position: 'sticky',
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '8px'
                }}
            >
                <Button type="primary" onClick={() => setCreating(true)}>New Conversation</Button>
            </div>
            {creating && <CreateThread onClose={() => setCreating(false)} />}
        </Card>
    );
}
