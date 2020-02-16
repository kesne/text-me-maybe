import { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Comment, Tooltip } from 'antd';
import {
    Message as MessageData,
    Thread,
    Sender,
    useMarkMessageSeenMutation,
    useMeQuery
} from '../../queries';

type Props = {
    thread: Partial<Thread>;
    message: Partial<MessageData>;
};

const Optimistic = styled.div<{ optimistic: boolean }>`
    opacity: ${({ optimistic }) => (optimistic ? '0.7' : '1')};
    background: ${({ optimistic }) => (optimistic ? '#f1f1f1' : 'transparent')};
    transition: 0.5s ease all;
`;

function isOptimistic(message: Partial<MessageData>) {
    return !!(message.id && message.id < 0);
}

export default function Message({ thread, message }: Props) {
    const me = useMeQuery({
        fetchPolicy: 'cache-only'
    });
    const [markMessageSeen] = useMarkMessageSeenMutation();

    useEffect(() => {
        if (message.sender !== Sender.Self && !message.seen) {
            markMessageSeen({
                variables: {
                    id: message.id as number
                }
            });
        }
    }, [message, markMessageSeen]);

    const author = message.sender === Sender.Other ? thread.name : me.data?.me.name;

    return (
        <Optimistic optimistic={isOptimistic(message)}>
            <Comment
                author={author}
                content={message.body}
                datetime={
                    <Tooltip
                        title={moment(Number(message.createdAt)).format('YYYY-MM-DD HH:mm:ss')}
                    >
                        <span>{moment(Number(message.createdAt)).fromNow()}</span>
                    </Tooltip>
                }
            />
        </Optimistic>
    );
}
