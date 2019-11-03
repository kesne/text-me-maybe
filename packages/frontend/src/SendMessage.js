import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.1), transparent)',
        display: 'flex'
    }
}));

const SEND_MESSAGE = gql`
    mutation SendMessage($threadID: ID!, $message: String!) {
        sendMessage(threadID: $threadID, body: $message) {
            id
            body
        }
    }
`;

const KEY_ENTER = 'Enter';

export default function SendMessage({ threadID, refetch }) {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [sendMessage, { loading, data, error }] = useMutation(SEND_MESSAGE, {
        variables: { message, threadID },
        update(cache, { data }) {
            cache.writeData({
                data: {
                    thread: {
                        __typename: 'Thread',
                        id: threadID,
                        lastMessage: {
                            __typename: 'Message',
                            ...data.sendMessage
                        }
                    }
                }
            });
        }
    });

    function checkSend(e) {
        if (e.key === KEY_ENTER) {
            sendMessage();
        }
    }

    useEffect(() => {
        if (data) {
            setMessage('');
            refetch();
        }
    }, [data, refetch]);

    return (
        <div className={classes.container}>
            <TextField
                label="Message..."
                value={message}
                disabled={loading}
                onChange={e => setMessage(e.target.value)}
                onKeyUp={checkSend}
                error={!!error}
                helperText={error ? error.message : undefined}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton color="primary" onClick={sendMessage} disabled={loading}>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                fullWidth
            />
        </div>
    );
}
