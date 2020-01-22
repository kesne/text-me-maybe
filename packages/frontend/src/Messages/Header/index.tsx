import React, { useState } from 'react';
import { Typography, Menu, Dropdown, Button } from 'antd';
import Row from '../../Row';
import EndThreadModal from './EndThreadModal';
import { Thread } from '../../queries';
import DeleteThreadModal from './DeleteThreadModal';

type Props = {
    thread: Partial<Thread>;
};

export default function Header({ thread }: Props) {
    const [endThreadOpen, setEndThreadOpen] = useState(false);
    const [deleteThreadOpen, setDeleteThreadOpen] = useState(false);

    const handleOpenEndModal = () => {
        setEndThreadOpen(true);
    };

    const handleOpenDeleteModal = () => {
        setDeleteThreadOpen(true);
    };

    const menu = (
        // TODO: display the details of the thread (to / from) in the header.
        // We talked about this before and decided against it but I think honestly it's worth it.
        <Menu>
            <Menu.Item key="0" disabled>
                To: <Typography.Text copyable>{thread.recipient}</Typography.Text>
            </Menu.Item>
            <Menu.Item key="1" onClick={handleOpenEndModal}>
                End Thread
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" onClick={handleOpenDeleteModal}>
                Delete Thread
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Row
                after={
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button>Actions</Button>
                    </Dropdown>
                }
            >
                <Typography.Title level={3}>{thread.name}</Typography.Title>
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
