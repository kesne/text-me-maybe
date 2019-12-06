import React, { useState, useEffect } from 'react';
import Spacing from '@airbnb/lunar/lib/components/Spacing';
import Input from '@airbnb/lunar/lib/components/Input';
import Button from '@airbnb/lunar/lib/components/Button';
import Row from '@airbnb/lunar/lib/components/Row';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
import Link from '../Link';
import { useSignInMutation } from '../queries';

type Props = {
    onSignIn(): void;
    onTOTPChallenge(): void;
};

export default function EmailPassword({ onSignIn, onTOTPChallenge }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signIn, { data, loading }] = useSignInMutation({
        variables: {
            email,
            password
        }
    });

    useEffect(() => {
        if (data) {
            if ('totpChallenge' in data.signIn) {
                onTOTPChallenge();
            } else {
                onSignIn();
            }
        }
    }, [data, onSignIn, onTOTPChallenge]);

    return (
        <>
            <Input
                required
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled={loading}
                value={email}
                onChange={setEmail}
                autoFocus
            />
            <Input
                required
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                autoComplete="current-password"
                disabled={loading}
            />
            <ButtonGroup endAlign>
                <Button
                    type="submit"
                    onClick={() => signIn()}
                    disabled={loading}
                >
                    Sign In
                </Button>
            </ButtonGroup>
            <Spacing top={3}>
                <Row
                    after={
                        <Link small to="/signup">
                            Don't have an account? Sign Up
                        </Link>
                    }
                >
                    <Link small to="/forgot">
                        Forgot password?
                    </Link>
                </Row>
            </Spacing>
        </>
    );
}
