import React from 'react';
import { Spin } from 'antd';
import EditAccount from './EditAccount';
import { useMeQuery } from '../queries';

// TODO: Why does this file exist????
export default function Basics() {
    const { data, loading } = useMeQuery();

    if (loading) {
        return <Spin />;
    }

    if (!data) {
        return <div>No dataz?</div>;
    }

    return <EditAccount me={data.me} />;
}
