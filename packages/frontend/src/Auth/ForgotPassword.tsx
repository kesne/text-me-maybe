import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import { useForgotPasswordMutation } from '../queries';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    desc: {
        marginTop: theme.spacing(1)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    completeIcon: {
        fontSize: '4rem',
        margin: theme.spacing(4),
        color: green[500]
    }
}));

export default function ForgotPassword() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [forgotPassword, { data, loading }] = useForgotPasswordMutation({
        variables: {
            email
        }
    });

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                {data ? (
                    <>
                        <CheckCircleIcon className={classes.completeIcon} />
                        <Typography>
                            A confirmation has been sent to your email. Click the link in the email
                            to finish resetting your password
                        </Typography>
                    </>
                ) : (
                    <>
                        <div className={classes.desc}>
                            <Typography variant="subtitle1">
                                Enter the email you created your account with, and we will email you
                                a link to reset your password.
                            </Typography>
                        </div>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={loading}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading}
                                onClick={() => forgotPassword()}
                            >
                                Email Recovery Link
                            </Button>
                            <Grid container>
                                <Grid item xs />
                                <Grid item>
                                    <Link component={RouterLink} to="/signin" variant="body2">
                                        Remembered your password? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </>
                )}
            </div>
        </Container>
    );
}
