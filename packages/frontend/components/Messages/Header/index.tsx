import { useState } from 'react';
import styled from 'styled-components';
import PhoneNumber from 'awesome-phonenumber';
import { PageHeader, Typography, Button } from 'antd';
import { Thread } from '../../../queries';
import DeleteOrEndThreadModal from './DeleteOrEndThreadModal';
import moment from 'moment';

type Props = {
    thread: Partial<Thread>;
};

function formatPhone(number: string) {
    return new PhoneNumber(number).getNumber('national');
}

const StyledPageHeader = styled(PageHeader)`
    border: 1px solid #f0f0f0;
    border-bottom: none;
`;

export default function Header({ thread }: Props) {
    const [modalType, setModalType] = useState<'end' | 'delete'>('end');
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = (mode: 'end' | 'delete') => () => {
        setModalType(mode);
        setModalVisible(true);
    };

    const subtitle = `Conversation with ${formatPhone(
        thread.recipient!
    )}. Messages will come from ${formatPhone(thread.number!)}`;

    return (
        <>
            <StyledPageHeader
                ghost={false}
                title={thread.name}
                subTitle={subtitle}
                extra={[
                    <Button key="end" type="ghost" onClick={handleOpenModal('end')}>
                        End Thread
                    </Button>,
                    <Button key="delete" type="danger" onClick={handleOpenModal('delete')}>
                        Delete Thread
                    </Button>
                ]}
            >
                <Typography.Text type="secondary">
                    Conversation started {moment(Number(thread.createdAt)).fromNow()}
                </Typography.Text>
            </StyledPageHeader>

            <DeleteOrEndThreadModal
                visible={modalVisible}
                mode={modalType}
                thread={thread}
                onClose={() => setModalVisible(false)}
            />
        </>
    );
}
