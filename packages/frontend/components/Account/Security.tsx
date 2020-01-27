import React, { useState } from 'react';
import { Button, Typography, Spin } from 'antd';
import { useMeQuery } from '../../queries';
import OnboardTOTP from './OnboardTOTP';
import DisableTOTP from './DisableTOTP';

function TOTPModal({ hasTOTP, onClose }: { hasTOTP: boolean; onClose(): void }) {
    if (hasTOTP) {
        return <DisableTOTP onClose={onClose} />;
    }
    return <OnboardTOTP onClose={onClose} />;
}

export default function Security() {
    const [totpModal, setTOTPModal] = useState(false);
    const { data, loading, refetch } = useMeQuery();

    if (loading || !data) {
        return <Spin />;
    }

    function onClose() {
        setTOTPModal(false);
        refetch();
    }

    return (
        <div>
            <Typography.Title>Security</Typography.Title>
            <Button>Change Password</Button>
            <hr />
            <Typography.Text>
                Two factor auth <strong>{data.me.hasTOTP ? 'is' : 'is not'}</strong> enabled.
            </Typography.Text>
            <Button
                type={data.me.hasTOTP ? 'danger' : 'default'}
                onClick={() => setTOTPModal(true)}
            >
                {data.me.hasTOTP ? 'Disable' : 'Enable'} TOTP
            </Button>

            {totpModal && <TOTPModal hasTOTP={data.me.hasTOTP} onClose={onClose} />}
        </div>
    );
}
