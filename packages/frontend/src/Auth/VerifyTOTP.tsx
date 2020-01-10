import React, { useState, useEffect } from 'react';
import Text from '@airbnb/lunar/lib/components/Text';
import Spacing from '@airbnb/lunar/lib/components/Spacing';
import Input from '@airbnb/lunar/lib/components/Input';
import Button from '@airbnb/lunar/lib/components/Button';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
import { useExchangeTotpMutation } from '../queries';

type Props = {
    onSignIn(): void;
};

export default function VerifyTOTP({ onSignIn }: Props) {
    const [token, setToken] = useState('');
    const [exchangeTotp, { data, loading }] = useExchangeTotpMutation({
        variables: {
            token
        }
    });

    useEffect(() => {
        if (data) {
            onSignIn();
        }
    }, [data, onSignIn]);

    return (
        <>
            <Spacing bottom={2}>
                <Text>
                    Two factor auth is enabled on this account. Please enter the token from your
                    authenticator app below:
                </Text>
            </Spacing>
            <Input
                required
                type="number"
                label="Token"
                name="token"
                value={token}
                onChange={setToken}
                pattern="[0-9]{6}"
                maxLength={6}
                autoFocus
            />
            <ButtonGroup endAlign>
                <Button
                    type="submit"
                    onClick={() => exchangeTotp()}
                    disabled={loading}
                >
                    Verify Two Factor Auth
                </Button>
            </ButtonGroup>
        </>
    );
}
