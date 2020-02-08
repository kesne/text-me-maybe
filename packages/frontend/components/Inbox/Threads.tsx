import { useState } from 'react';
// import Router from 'next/router';
import { Button, Card, List, Input, Skeleton, Alert } from 'antd';
import CreateThread from './CreateThread';
import { useThreadsQuery } from '../../queries';
import ThreadItem from './ThreadItem';
import { FormOutlined } from '@ant-design/icons';
import Row from '../Row';

export default function Threads() {
    const [creating, setCreating] = useState(false);
    const { data, error, loading } = useThreadsQuery();

    // useEffect(() => {
    //     if (data && data.threads.length) {
    //         Router.replace(`/inbox/${data.threads[0].id}`);
    //     }
    // }, [data, history]);

    return (
        <Card>
            <Row after={<Button onClick={() => setCreating(true)} icon={<FormOutlined />} />}>
                <Input.Search placeholder="Search..." />
            </Row>
            {loading ? (
                <Skeleton />
            ) : !data || error ? (
                <Alert
                    message="Sorry we couldn't load your messages."
                    description="Please try again later."
                    type="error"
                />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={data.threads}
                    renderItem={item => <ThreadItem key={item.id} thread={item} />}
                />
            )}
            {creating && <CreateThread onClose={() => setCreating(false)} />}
        </Card>
    );
}
