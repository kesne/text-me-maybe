import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useExchangeTotpMutation } from '../queries';

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

type Props = {
    onSignIn(): void;
};

export default function VerifyTOTP({ onSignIn }: Props) {
    const classes = useStyles();
    const [token, setToken] = useState('');
    const [exchangeTotp, { data, loading }] = useExchangeTotpMutation({
        variables: {
            token
        }
    });

    useEffect(() => {
        if (data) {
            onSignIn();
        }
    }, [data, onSignIn]);

    return (
        <>
            <Typography>
                Two factor auth is enabled on this account. Please enter the token from your
                authenticator app below:
            </Typography>
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
                onClick={() => exchangeTotp()}
                disabled={loading}
            >
                Verify Two Factor Auth
            </Button>
        </>
    );
}
