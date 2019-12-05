import React, { useState } from 'react';
import Button from '@airbnb/lunar/lib/components/Button';
import DangerButton from '@airbnb/lunar/lib/components/DangerButton';
import Text from '@airbnb/lunar/lib/components/Text';
import Title from '@airbnb/lunar/lib/components/Title';
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

    const TOTPButton = data.me.hasTOTP ? DangerButton : Button;

    return (
        <div>
            <Title level={3}>Security</Title>
            <Button>
                Change Password
            </Button>
            <hr />
            <Text>
                Two factor auth <strong>{data.me.hasTOTP ? 'is' : 'is not'}</strong> enabled.
            </Text>
            <TOTPButton
                onClick={() => setTOTPModal(true)}
            >
                {data.me.hasTOTP ? 'Disable' : 'Enable'} TOTP
            </TOTPButton>

            {totpModal && <TOTPModal hasTOTP={data.me.hasTOTP} onClose={onClose} />}
        </div>
    );
}
