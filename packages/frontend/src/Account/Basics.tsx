import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useMeQuery } from '../queries';

export default function Basics() {
    const { data, loading } = useMeQuery();

    if (loading) {
        return <div>'Loading...'</div>;
    }

    if (!data) {
        return <div>'No dataz?'</div>;
    }

    return (
        <div>
            <Typography variant="h5">Your Account</Typography>
            Name: {data.me.name}
            Email: {data.me.email}
        </div>
    );
}
