import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import { MESSAGES } from './Messages';
import client from './client';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.1), transparent)',
        display: 'flex'
    }
}));

const SEND_MESSAGE = gql`
    mutation SendMessage($message: String!) {
        sendMessage(body: $message) {
            body
        }
    }
`;

export default function SendMessage() {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [sendMessage, { loading, data }] = useMutation(SEND_MESSAGE, { variables: { message } });

    useEffect(() => {
        if (data) {
            // Force a refetch of messages from network
            client.query({ query: MESSAGES, fetchPolicy: 'network-only' });
            setMessage('');
        }
    }, [data]);

    return (
        <div className={classes.container}>
            <TextField
                label="Message..."
                value={message}
                disabled={loading}
                onChange={e => setMessage(e.target.value)}
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton color="primary" onClick={sendMessage}>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </div>
    );
}
