import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Thread, useDeleteThreadMutation, ThreadsDocument, ThreadsQuery } from '../../queries';

type Props = {
    thread: Partial<Thread>;
    onClose(): void;
};

export default function DeleteThreadModal({ thread, onClose }: Props) {
    const history = useHistory();
    const [deleteThread, { data, loading }] = useDeleteThreadMutation({
        variables: {
            id: thread.id as number
        },
        update(cache) {
            const data = cache.readQuery<ThreadsQuery>({
                query: ThreadsDocument
            });

            if (!data) return;

            cache.writeQuery({
                query: ThreadsDocument,
                data: {
                    ...data,
                    threads: data.threads.filter(t => t.id !== thread.id)
                }
            });
        }
    });

    useEffect(() => {
        if (data) {
            history.replace('/threads');
            onClose();
        }
    }, [data, onClose, history]);

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Delete thread "{thread.name}"</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography color="textSecondary">
                        Deleting a thread will remove it forever! Are you sure you want to do this?
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => deleteThread()}
                    disabled={loading}
                    variant="contained"
                    color="primary"
                >
                    Delete Thread
                </Button>
            </DialogActions>
        </Dialog>
    );
}
