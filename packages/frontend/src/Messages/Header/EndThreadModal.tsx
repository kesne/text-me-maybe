import React, { useEffect } from 'react';
import Modal from '@airbnb/lunar/lib/components/Modal';
import Text from '@airbnb/lunar/lib/components/Text';
import Button from '@airbnb/lunar/lib/components/Button';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
import { Thread, useEndThreadMutation } from '../../queries';

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
        <Modal
            title={`End thread "${thread.name}"`}
            footer={
                <ButtonGroup endAlign>
                    <Button inverted onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => endThread()} disabled={loading}>
                        End Thread
                    </Button>
                </ButtonGroup>
            }
            onClose={onClose}
        >
            <Text>
                Ending a thread will prevent the other person from messaging you again! Are you sure
                that you want to do this?
            </Text>
        </Modal>
    );
}
