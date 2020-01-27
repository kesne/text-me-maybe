import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Button, Spin, Card, List, Input } from 'antd';
import CreateThread from './CreateThread';
import { useThreadsQuery } from '../../queries';
import ThreadItem from './ThreadItem';
import { FormOutlined } from '@ant-design/icons';
import Row from '../../src/Row';

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

    if (loading) {
        return <Spin />;
    }

    if (error || !data) {
        return <div>Uh oh... {error}</div>;
    }

    return (
        <Card>
            <Row after={<Button onClick={() => setCreating(true)} icon={<FormOutlined />} />}>
                <Input.Search placeholder="Search..." />
            </Row>
            <List
                itemLayout="horizontal"
                dataSource={data.threads}
                renderItem={item => <ThreadItem key={item.id} thread={item} />}
            />
            {creating && <CreateThread onClose={() => setCreating(false)} />}
        </Card>
    );
}
