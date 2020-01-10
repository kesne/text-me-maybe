import React, { useState, useEffect } from 'react';
import Modal from '@airbnb/lunar/lib/components/Modal';
import Input from '@airbnb/lunar/lib/components/Input';
import Button from '@airbnb/lunar/lib/components/Button';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
import Text from '@airbnb/lunar/lib/components/Text';
import Spacing from '@airbnb/lunar/lib/components/Spacing';
import { useDisableTotpMutation } from '../queries';

type Props = {
    onClose(): void;
};

export default function DisableTOTP({ onClose }: Props) {
    // const classes = useStyles();
    const [password, setPassword] = useState('');
    const [disableTOTP, { data, loading }] = useDisableTotpMutation({
        variables: {
            password
        }
    });

    useEffect(() => {
        if (data) {
            onClose();
        }
    }, [data, onClose]);

    return (
        <Modal
            title="Disable Two Factor Auth"
            onClose={onClose}
            footer={
                <ButtonGroup endAlign>
                    <Button onClick={onClose} inverted>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} onClick={() => disableTOTP()}>
                        Disable TOTP
                    </Button>
                </ButtonGroup>
            }
        >
            <Spacing bottom={2}>
                <Text large>
                    Scan this QR code in an authenticator app to enable Two Factor Authentication.
                    This will require you to enter a pin from the authenticator app every time you
                    sign in.
                </Text>
            </Spacing>
            <Input
                type="password"
                label="Password"
                value={password}
                onChange={setPassword}
                autoFocus
                required
            />
        </Modal>
    );
}
