import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useMeQuery } from '../queries';
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
        return <div>Loading page...</div>;
    }

    function onClose() {
        setTOTPModal(false);
        refetch();
    }

    return (
        <div>
            <Typography variant="h5">Security</Typography>
            <Button variant="outlined" color="primary">
                Change Password
            </Button>
            <hr />
            <Typography>
                Two factor auth <strong>{data.me.hasTOTP ? 'is' : 'is not'}</strong> enabled.
            </Typography>
            <Button
                onClick={() => setTOTPModal(true)}
                variant="outlined"
                color={data.me.hasTOTP ? 'secondary' : 'primary'}
            >
                {data.me.hasTOTP ? 'Disable' : 'Enable'} TOTP
            </Button>

            {totpModal && <TOTPModal hasTOTP={data.me.hasTOTP} onClose={onClose} />}
        </div>
    );
}
