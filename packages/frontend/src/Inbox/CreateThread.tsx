import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MuiPhoneNumber from 'material-ui-phone-number';
import client from '../utils/client';
import { useCreateThreadMutation, ThreadsDocument } from '../queries';

type Props = {
    onClose: () => void;
};

export default function CreateThread({ onClose }: Props) {
    const history = useHistory();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    // TODO: Eventually this should probably just write into the cache directly,
    // but for now I'll just re-fetch all of the threads after creating one.
    const [createThread, { loading, data }] = useCreateThreadMutation({
        variables: {
            name,
            phoneNumber,
            message
        }
    });

    useEffect(() => {
        if (data) {
            // Force a refetch of threads from network
            client.query({ query: ThreadsDocument, fetchPolicy: 'network-only' });
            history.push(`/inbox/${data.createThread.id}`);
            onClose();
        }
    }, [data, history, onClose]);

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Create a new message thread</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography color="textSecondary">
                        Message will arrive from a unique phone number, and will not be associated
                        with you.
                    </Typography>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        margin="normal"
                        disabled={loading}
                        fullWidth
                        autoFocus
                    />
                    <MuiPhoneNumber
                        label="Phone Number"
                        value={phoneNumber}
                        defaultCountry="us"
                        onChange={setPhoneNumber}
                        margin="normal"
                        disabled={loading}
                        fullWidth
                    />
                    <TextField
                        label="Message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        margin="normal"
                        disabled={loading}
                        fullWidth
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => createThread()}
                    disabled={loading}
                    variant="contained"
                    color="primary"
                >
                    Create Thread
                </Button>
            </DialogActions>
        </Dialog>
    );
}
