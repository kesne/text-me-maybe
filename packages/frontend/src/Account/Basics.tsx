import React, { useState } from 'react';
import EditAccount from './EditAccount';
import { useMeQuery } from '../queries';

export default function Basics() {
    const { data, loading } = useMeQuery();
    const [editing, setEditing] = useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No dataz?</div>;
    }

    return (
        <EditAccount me={data.me} editing={editing} onEditingChange={setEditing} />
    );
}
