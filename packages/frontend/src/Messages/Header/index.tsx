import React, { useState } from 'react';
import Title from '@airbnb/lunar/lib/components/Title';
import Row from '@airbnb/lunar/lib/components/Row';
import MenuToggle, { Item as MenuItem } from '@airbnb/lunar/lib/components/MenuToggle';
import EndThreadModal from './EndThreadModal';
import { Thread } from '../../queries';
import DeleteThreadModal from './DeleteThreadModal';

type Props = {
    thread: Partial<Thread>;
};

export default function Header({ thread }: Props) {
    const [endThreadOpen, setEndThreadOpen] = useState(false);
    const [deleteThreadOpen, setDeleteThreadOpen] = useState(false);

    const copyRecipient = () => {
        navigator.clipboard.writeText(thread.recipient as string);
    };

    const handleOpenEndModal = () => {
        setEndThreadOpen(true);
    };

    const handleOpenDeleteModal = () => {
        setDeleteThreadOpen(true);
    };

    return (
        <>
            <Row
                after={
                    <MenuToggle accessibilityLabel="Actions" toggleLabel="Actions" muted inverted>
                        <MenuItem onClick={copyRecipient}>To: {thread.recipient}</MenuItem>
                        {!thread.ended && (
                            <MenuItem onClick={handleOpenEndModal}>End Thread</MenuItem>
                        )}
                        <MenuItem onClick={handleOpenDeleteModal}>Delete Thread</MenuItem>
                    </MenuToggle>
                }
            >
                <Title level={3}>{thread.name}</Title>
            </Row>

            {endThreadOpen && (
                <EndThreadModal thread={thread} onClose={() => setEndThreadOpen(false)} />
            )}
            {deleteThreadOpen && (
                <DeleteThreadModal thread={thread} onClose={() => setDeleteThreadOpen(false)} />
            )}
        </>
    );
}
