import React, { useEffect } from 'react';
import moment from 'moment';
import { Typography } from 'antd';
import { Message as MessageData, Sender, useMarkMessageSeenMutation } from '../queries';

type Props = {
    message: Partial<MessageData>;
};

export default function Message({ message }: Props) {
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

    return (
        <div>
            <Typography.Title level={3}>
                {message.sender === Sender.Other ? 'Other Person' : 'You'}
            </Typography.Title>
            <Typography.Paragraph>{message.body}</Typography.Paragraph>
            <Typography.Paragraph>
                {moment(Number(message.createdAt)).format('dddd, MMM D, h:mm')}
            </Typography.Paragraph>
        </div>
    );
}
