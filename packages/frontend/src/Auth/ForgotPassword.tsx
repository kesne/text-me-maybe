import React, { useState } from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import Text from '@airbnb/lunar/lib/components/Text';
import Input from '@airbnb/lunar/lib/components/Input';
import Spacing from '@airbnb/lunar/lib/components/Spacing';
import Button from '@airbnb/lunar/lib/components/Button';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheckAlt';
import { useForgotPasswordMutation } from '../queries';
import AuthForm from './AuthForm';
import Link from '../Link';

export default function ForgotPassword() {
    const [classes, cx] = useStyles(theme => ({
        rightAlign: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        complete: {
            margin: theme.unit * 4,
            display: 'flex',
            justifyContent: 'center'
        }
    }));
    const [email, setEmail] = useState('');
    const [forgotPassword, { data, loading }] = useForgotPasswordMutation({
        variables: {
            email
        }
    });

    return (
        <AuthForm title="Forgot password">
            {data ? (
                <>
                    <Text>
                        A confirmation has been sent to your email. Click the link in the email to
                        finish resetting your password
                    </Text>
                    <div className={cx(classes.complete)}>
                        <IconCheck color="green" size={64} />
                    </div>
                </>
            ) : (
                <>
                    <Text>
                        Enter the email you created your account with, and we will email you a link
                        to reset your password.
                    </Text>
                    <Spacing top={2}>
                        <form noValidate>
                            <Input
                                required
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={setEmail}
                                disabled={loading}
                            />
                            <ButtonGroup endAlign>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    onClick={() => forgotPassword()}
                                >
                                    Email Recovery Link
                                </Button>
                            </ButtonGroup>
                        </form>
                    </Spacing>
                    <Spacing top={3}>
                        <div className={cx(classes.rightAlign)}>
                            <Link small to="/signin">
                                Remembered your password? Sign in
                            </Link>
                        </div>
                    </Spacing>
                </>
            )}
        </AuthForm>
    );
}
