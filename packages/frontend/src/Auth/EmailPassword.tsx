import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { useSignInMutation } from '../queries';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

type Props = {
    onSignIn(): void;
    onTOTPChallenge(): void;
};

export default function EmailPassword({ onSignIn, onTOTPChallenge }: Props) {
    const classes = useStyles();
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
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled={loading}
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={loading}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => signIn()}
                disabled={loading}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link component={RouterLink} to="/signup" variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </>
    );
}
