import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useOnboardTotpQuery, useEnableTotpMutation } from '../queries';

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
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function OnboardTOTP() {
    const classes = useStyles();
    const history = useHistory();
    const [token, setToken] = useState('');
    const { data, loading } = useOnboardTotpQuery();

    const [enableTotp, totpEnableState] = useEnableTotpMutation({
        variables: {
            token,
            secret: data ? data.onboardTotp.secret : '',
        }
    });

    useEffect(() => {
        if (totpEnableState.data) {
            history.replace('/threads');
        }
    }, [totpEnableState.data, history]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>What happen</div>;
    }

    const OTP_DATA = `otpauth://totp/${data.onboardTotp.name}?secret=${data.onboardTotp.secret}`;

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Two Factor Auth Setup
                </Typography>
                <img
                    alt="Enable Two Factor Authentication"
                    src={`https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${OTP_DATA}`}
                />
                <Typography>Or enter it manually: {data.onboardTotp.secret}</Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        label="Token"
                        name="token"
                        value={token}
                        onChange={e => setToken(e.target.value)}
                        inputProps={{
                            pattern: '[0-9]{6}',
                            maxlength: '6'
                        }}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={totpEnableState.loading}
                        onClick={() => enableTotp()}
                    >
                        Enable
                    </Button>
                </form>
            </div>
        </Container>
    );
}
