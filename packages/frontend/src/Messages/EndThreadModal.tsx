import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Thread, useEndThreadMutation } from '../queries';

type Props = {
    thread: Partial<Thread>;
    onClose(): void;
};

export default function EndThreadModal({ thread, onClose }: Props) {
    const [endThread, { data, loading }] = useEndThreadMutation({
        variables: {
            id: thread.id as number
        }
    });

    useEffect(() => {
        if (data) {
            onClose();
        }
    }, [data, onClose]);

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>End thread "{thread.name}"</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography color="textSecondary">
                        Ending a thread will prevent the other person from messaging you again! Are
                        you sure that you want to do this?
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => endThread()}
                    disabled={loading}
                    variant="contained"
                    color="primary"
                >
                    End Thread
                </Button>
            </DialogActions>
        </Dialog>
    );
}
