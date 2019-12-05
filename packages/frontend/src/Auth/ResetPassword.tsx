import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@airbnb/lunar/lib/components/Button';
import Input from '@airbnb/lunar/lib/components/Input';
import Text from '@airbnb/lunar/lib/components/Text';
import Title from '@airbnb/lunar/lib/components/Title';
import { useResetPasswordMutation } from '../queries';
import HasUserContext from '../HasUserContext';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const params = useParams<{ uuid: string }>();
    const { setHasUser } = useContext(HasUserContext);
    const history = useHistory();
    const [resetPassword, { data, loading }] = useResetPasswordMutation({
        variables: {
            uuid: params.uuid,
            password
        },
    });

    useEffect(() => {
        resetPassword();
    }, [resetPassword]);

    useEffect(() => {
        if (data && data.resetPassword.complete) {
            // TODO: It's really annoying manually setting this hasUser context.
            // We probably should instead just have a standard way for GraphQL
            // to update this value directly, and trigger a re-render through children.
            setHasUser(true);
            history.push('/inbox');
        }
    }, [data, history, setHasUser]);

    function handleFinishReset() {
        resetPassword();
    }

    return (
        <div>
            <Title level={3}>Password Reset</Title>
            <Text>You can set a new password for your account below, which can be used for all future sign-ins.</Text>
            <Input
                name="password"
                label="New Password"
                placeholder="Password..."
                value={password}
                disabled={!data || loading}
                onChange={setPassword}
            />
            <Button onClick={handleFinishReset}>Reset Password</Button>
        </div>
    );
}
