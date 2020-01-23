import React, { useState, useCallback, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AuthForm from './AuthForm';
import VerifyTOTP from './VerifyTOTP';
import EmailPassword from './EmailPassword';
import HasUserContext from '../HasUserContext';

export default function SignUp() {
    const history = useHistory();
    const location = useLocation();
    const { setHasUser } = useContext(HasUserContext);
    const [totpChallenge, setTOTPChallenge] = useState(false);

    const onSignIn = useCallback(() => {
        setHasUser(true);
        history.push((location.state && location.state.from) || '/inbox');
    }, [history, location, setHasUser]);

    const onTOTPChallenge = useCallback(() => {
        setTOTPChallenge(true);
    }, [setTOTPChallenge]);

    return (
        <AuthForm title="Sign in">
            {totpChallenge ? (
                <VerifyTOTP onSignIn={onSignIn} />
            ) : (
                <EmailPassword onSignIn={onSignIn} onTOTPChallenge={onTOTPChallenge} />
            )}
        </AuthForm>
    );
}
