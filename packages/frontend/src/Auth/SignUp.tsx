import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
import Spacing from '@airbnb/lunar/lib/components/Spacing';
import Input from '@airbnb/lunar/lib/components/Input';
import Button from '@airbnb/lunar/lib/components/Button';
import Link from '../Link';
import AuthForm from './AuthForm';
import { useSignUpMutation } from '../queries';
import HasUserContext from '../HasUserContext';

export default function SignUp() {
    const [classes, cx] = useStyles(() => ({
        rightAlign: {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    }));
    const history = useHistory();
    const { setHasUser } = useContext(HasUserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUp, { data, loading }] = useSignUpMutation({
        variables: {
            name,
            email,
            password
        }
    });

    useEffect(() => {
        if (data) {
            setHasUser(true);
            history.push('/inbox');
        }
    }, [data, history, setHasUser]);

    return (
        <AuthForm title="Sign up">
            <form noValidate>
                <Input
                    required
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={setName}
                    disabled={loading}
                    autoFocus
                />
                <Input
                    required
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={setEmail}
                    disabled={loading}
                />
                <Input
                    required
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={setPassword}
                    disabled={loading}
                />
                <ButtonGroup endAlign>
                    <Button type="submit" disabled={loading} onClick={() => signUp()}>
                        Sign Up
                    </Button>
                </ButtonGroup>
                <Spacing top={3}>
                    <div className={cx(classes.rightAlign)}>
                        <Link small to="/signin">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </Spacing>
            </form>
        </AuthForm>
    );
}
