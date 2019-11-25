import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { useDisableTotpMutation } from '../queries';

// const useStyles = makeStyles(theme => ({}));

type Props = {
    onClose(): void;
};

export default function DisableTOTP({ onClose }: Props) {
    // const classes = useStyles();
    const [password, setPassword] = useState('');
    const [disableTOTP, { data, loading }] = useDisableTotpMutation({
        variables: {
            password
        }
    });

    useEffect(() => {
        if (data) {
            onClose();
        }
    }, [data, onClose]);

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Disable Two Factor Auth</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography>
                        Scan this QR code in an authenticator app to enable Two Factor
                        Authentication. This will require you to enter a pin from the authenticator
                        app every time you sign in.
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoFocus
                        required
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={loading}
                    onClick={() => disableTOTP()}
                >
                    Disable TOTP
                </Button>
            </DialogActions>
        </Dialog>
    );
}
