import React, { useState } from 'react';
import { Typography, Menu, Dropdown, Button } from 'antd';
import Row from '../../Row';
import { Thread } from '../../queries';
import DeleteOrEndThreadModal from './DeleteOrEndThreadModal';

type Props = {
    thread: Partial<Thread>;
};

export default function Header({ thread }: Props) {
    const [openedModal, setOpenedModal] = useState<null | 'end' | 'delete'>(null);

    const handleOpenModal = (mode: 'end' | 'delete') => () => {
        setOpenedModal(mode);
    };

    const menu = (
        // TODO: display the details of the thread (to / from) in the header.
        // We talked about this before and decided against it but I think honestly it's worth it.
        <Menu>
            <Menu.Item key="0" disabled>
                To: <Typography.Text copyable>{thread.recipient}</Typography.Text>
            </Menu.Item>
            <Menu.Item key="1" onClick={handleOpenModal('end')}>
                End Thread
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" onClick={handleOpenModal('delete')}>
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

            {openedModal && (
                <DeleteOrEndThreadModal
                    mode={openedModal}
                    thread={thread}
                    onClose={() => setOpenedModal(null)}
                />
            )}
        </>
    );
}
