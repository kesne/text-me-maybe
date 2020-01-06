import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@airbnb/lunar/lib/components/Modal';
import Text from '@airbnb/lunar/lib/components/Text';
import Button from '@airbnb/lunar/lib/components/Button';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
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
            history.replace('/inbox');
            onClose();
        }
    }, [data, onClose, history]);

    return (
        <Modal
            title={`Delete thread "${thread.name}"`}
            onClose={onClose}
            footer={
                <ButtonGroup endAlign>
                    <Button inverted onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => deleteThread()} disabled={loading}>
                        Delete Thread
                    </Button>
                </ButtonGroup>
            }
        >
            <Text>Deleting a thread will remove it forever! Are you sure you want to do this?</Text>
        </Modal>
    );
}
