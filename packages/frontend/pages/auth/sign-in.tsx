import { useState, useCallback } from 'react';
import Router from 'next/router'
import Container from '../../components/Auth/Container';
import VerifyTOTP from '../../components/Auth/VerifyTOTP';
import EmailPassword from '../../components/Auth/EmailPassword';

export default function SignUp() {
    const [totpChallenge, setTOTPChallenge] = useState(false);

    const onSignIn = useCallback(() => {
        Router.push('/inbox');
    }, []);

    const onTOTPChallenge = useCallback(() => {
        setTOTPChallenge(true);
    }, [setTOTPChallenge]);

    return (
        <Container title="Sign in">
            {totpChallenge ? (
                <VerifyTOTP onSignIn={onSignIn} />
            ) : (
                <EmailPassword onSignIn={onSignIn} onTOTPChallenge={onTOTPChallenge} />
            )}
        </Container>
    );
}
