import React, { useEffect } from 'react';
import moment from 'moment';
import MessageItem from '@airbnb/lunar/lib/components/MessageItem';
import Text from '@airbnb/lunar/lib/components/Text';
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
        <MessageItem
            title={message.sender === Sender.Other ? 'Other Person' : 'You!'}
            formattedTimestamp={moment(Number(message.createdAt)).format('dddd, MMM D, h:mm')}
        >
            <Text>{message.body}</Text>
        </MessageItem>
    );
}
