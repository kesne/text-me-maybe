import React, { useState, useEffect, useRef } from 'react';
import Input from '@airbnb/lunar/lib/components/Input';
import Row from '@airbnb/lunar/lib/components/Row';
import Button from '@airbnb/lunar/lib/components/Button';
import { useSendMessageMutation } from '../queries';

const KEY_ENTER = 'Enter';

type Props = {
    threadID: number;
    refetch: () => void;
};

export default function SendMessage({ threadID, refetch }: Props) {
    const inputRef = useRef<HTMLInputElement>();
    const [message, setMessage] = useState('');
    const [sendMessage, { loading, data, error }] = useSendMessageMutation({
        variables: { message, threadID },
        update(cache, { data }) {
            if (!data) {
                return;
            }

            cache.writeData({
                data: {
                    thread: {
                        __typename: 'Thread',
                        id: threadID,
                        lastMessage: {
                            __typename: 'Message',
                            seen: true,
                            ...data.sendMessage
                        }
                    }
                }
            });
        }
    });

    function checkSend(e: React.KeyboardEvent) {
        if (e.key === KEY_ENTER) {
            sendMessage();
        }
    }

    useEffect(() => {
        if (data) {
            setMessage('');
            refetch();
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [data, refetch]);

    return (
        <Row after={<Button>Send</Button>}>
            <Input
                hideLabel
                label="Message to send"
                placeholder="Message to send"
                value={message}
                onChange={setMessage}
                onKeyUp={checkSend}
                disabled={loading}
                errorMessage={error ? error.message : undefined}
            />
        </Row>
    );
}
