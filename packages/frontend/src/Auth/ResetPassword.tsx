import React from 'react';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
    const params = useParams<{ uuid: string }>();
    return <div>Reset Password {params.uuid}</div>;
}
