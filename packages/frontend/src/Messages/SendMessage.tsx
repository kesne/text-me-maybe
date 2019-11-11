import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import { useSendMessageMutation } from '../queries';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.1), transparent)',
        display: 'flex'
    }
}));

const KEY_ENTER = 'Enter';

type Props = {
    threadID: number;
    refetch: () => void;
};

export default function SendMessage({ threadID, refetch }: Props) {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [sendMessage, { loading, data, error }] = useSendMessageMutation({
        variables: { message, threadID },
        update(cache, { data }) {
            if (!data) {
                return;
            }

            cache.writeData({
                data: {
                    thread: {
                        __typename: 'Thread',
                        id: threadID,
                        lastMessage: {
                            __typename: 'Message',
                            seen: true,
                            ...data.sendMessage
                        }
                    }
                }
            });
        }
    });

    function checkSend(e: React.KeyboardEvent) {
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
                            <IconButton
                                color="primary"
                                onClick={() => sendMessage()}
                                disabled={loading}
                            >
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
