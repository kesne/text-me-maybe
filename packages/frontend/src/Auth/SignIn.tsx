import React, { useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import VerifyTOTP from './VerifyTOTP';
import EmailPassword from './EmailPassword';
import auth from '../utils/auth';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    }
}));

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [totpToken, setTotpToken] = useState('');

    const onToken = useCallback((token: string) => {
        auth.set(token);
        history.push((location.state && location.state.from) || '/threads');
    }, [history, location]);

    const onTotpToken = useCallback((token: string) => {
        setTotpToken(token);
    }, [setTotpToken]);

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    {totpToken ? (
                        <VerifyTOTP totpToken={totpToken} onToken={onToken} />
                    ) : (
                        <EmailPassword onToken={onToken} onTotpToken={onTotpToken} />
                    )}
                </form>
            </div>
        </Container>
    );
}
