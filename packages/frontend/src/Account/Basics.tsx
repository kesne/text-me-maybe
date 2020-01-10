import React, { useState } from 'react';
import Loader from '@airbnb/lunar/lib/components/Loader';
import EditAccount from './EditAccount';
import { useMeQuery } from '../queries';

export default function Basics() {
    const { data, loading } = useMeQuery();
    const [editing, setEditing] = useState(false);

    if (loading) {
        return <Loader />;
    }

    if (!data) {
        return <div>No dataz?</div>;
    }

    return (
        <EditAccount me={data.me} editing={editing} onEditingChange={setEditing} />
    );
}
