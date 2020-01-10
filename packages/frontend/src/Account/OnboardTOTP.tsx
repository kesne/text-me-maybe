import React, { useState, useEffect } from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import Modal from '@airbnb/lunar/lib/components/Modal';
import Text from '@airbnb/lunar/lib/components/Text';
import Button from '@airbnb/lunar/lib/components/Button';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
import Input from '@airbnb/lunar/lib/components/Input';
import Loader from '@airbnb/lunar/lib/components/Loader';
import { useOnboardTotpQuery, useEnableTotpMutation } from '../queries';

type Props = {
    onClose(): void;
};

export default function OnboardTOTP({ onClose }: Props) {
    const [classes, cx] = useStyles(theme => ({
        qrCode: {
            display: 'block',
            margin: `${theme.unit * 2}px auto`
        },
        secret: {
            fontFamily: 'monospace',
            fontSize: '1.3rem'
        },
        inputWrapper: {
            display: 'flex',
            justifyContent: 'center'
        }
    }));

    const [token, setToken] = useState('');
    const { data, loading } = useOnboardTotpQuery({
        fetchPolicy: 'network-only'
    });

    const [enableTotp, totpEnableState] = useEnableTotpMutation({
        variables: {
            token,
            secret: data ? data.onboardTotp.secret : ''
        }
    });

    useEffect(() => {
        if (totpEnableState.data) {
            onClose();
        }
    }, [totpEnableState.data, onClose]);

    if (loading) {
        return <Loader />;
    }

    if (!data) {
        return <div>What happen</div>;
    }

    const OTP_DATA = `otpauth://totp/${data.onboardTotp.name}?secret=${data.onboardTotp.secret}`;

    return (
        <Modal
            title="Two Factor Auth Setup"
            onClose={onClose}
            footer={
                <ButtonGroup endAlign>
                    <Button onClick={onClose} inverted>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={totpEnableState.loading}
                        onClick={() => enableTotp()}
                    >
                        Enable
                    </Button>
                </ButtonGroup>
            }
        >
            <Text>
                Scan this QR code in an authenticator app to enable Two Factor Authentication. This
                will require you to enter a pin from the authenticator app every time you sign in.
            </Text>
            <img
                className={cx(classes.qrCode)}
                alt="Enable Two Factor Authentication"
                src={`https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${OTP_DATA}`}
            />
            <Text>
                Or enter it manually:
                <br />
                <div className={cx(classes.secret)}>{data.onboardTotp.secret}</div>
            </Text>
            <div className={cx(classes.inputWrapper)}>
                <Input
                    large
                    label="Token"
                    placeholder="6 digit code..."
                    value={token}
                    onChange={setToken}
                    maxLength={6}
                    pattern="[0-9]{6}"
                    autoFocus
                />
            </div>
        </Modal>
    );
}
