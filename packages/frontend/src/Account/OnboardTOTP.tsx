import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { useOnboardTotpQuery, useEnableTotpMutation } from '../queries';

const useStyles = makeStyles(theme => ({
    qrCode: {
        display: 'block',
        margin: `${theme.spacing(2)}px auto`
    },
    secret: {
        fontFamily: 'monospace',
        fontSize: '1.3rem'
    },
    inputWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    input: {
        fontFamily: 'monospace',
        fontSize: '4rem',
        width: 200,
        textAlign: 'center',
        '::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none'
        },
        '::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none'
        }
    }
}));

type Props = {
    onClose(): void
}

export default function OnboardTOTP({ onClose }: Props) {
    const classes = useStyles();
    const [token, setToken] = useState('');
    const { data, loading } = useOnboardTotpQuery({
        fetchPolicy: 'network-only'
    });

    const [enableTotp, totpEnableState] = useEnableTotpMutation({
        variables: {
            token,
            secret: data ? data.onboardTotp.secret : ''
        }
    });

    useEffect(() => {
        if (totpEnableState.data) {
            onClose();
        }
    }, [totpEnableState.data, onClose]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>What happen</div>;
    }

    const OTP_DATA = `otpauth://totp/${data.onboardTotp.name}?secret=${data.onboardTotp.secret}`;

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Two Factor Auth Setup</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography>
                        Scan this QR code in an authenticator app to enable Two Factor
                        Authentication. This will require you to enter a pin from the authenticator
                        app every time you sign in.
                    </Typography>
                    <img
                        className={classes.qrCode}
                        alt="Enable Two Factor Authentication"
                        src={`https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${OTP_DATA}`}
                    />
                    <Typography align="center">
                        Or enter it manually:
                        <br />
                        <div className={classes.secret}>{data.onboardTotp.secret}</div>
                    </Typography>
                    <div className={classes.inputWrapper}>
                        <TextField
                            margin="normal"
                            type="text"
                            label="Token"
                            name="token"
                            value={token}
                            onChange={e => setToken(e.target.value)}
                            inputProps={{
                                className: classes.input,
                                pattern: '[0-9]{6}',
                                maxLength: '6'
                            }}
                            autoFocus
                            required
                        />
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={totpEnableState.loading}
                    onClick={() => enableTotp()}
                >
                    Enable
                </Button>
            </DialogActions>
        </Dialog>
    );
}
