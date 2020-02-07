import { useState } from 'react';
import { Button, Typography, Spin, PageHeader } from 'antd';
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
    const [{ data, fetching }, refetch] = useMeQuery();

    if (fetching || !data) {
        return <Spin />;
    }

    function onClose() {
        setTOTPModal(false);
        refetch();
    }

    return (
        <PageHeader title="Security" ghost={false}>
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
        </PageHeader>
    );
}
