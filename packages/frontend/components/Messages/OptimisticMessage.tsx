import React, { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Comment, Tooltip, Button, Alert } from 'antd';
import { Message as MessageData, Thread, useMeQuery, useSendMessageMutation } from '../../queries';
import { useStore } from '../utils/messagesToSendStore';

type Props = {
    message: Partial<MessageData> & {
        threadID: number;
    };
};

const Optimistic = styled.div<{ error: boolean }>`
    opacity: 0.7;
    background: #f1f1f1;
`;

const StyledAlert = styled(Alert)`
    margin-right: 12px;
`;

const RetryButton = styled.div`
    float: right;
    margin-left: 8px;
`;

function OptimisticMessage({ message }: Props) {
    const remove = useStore(state => state.remove);
    const me = useMeQuery({
        fetchPolicy: 'cache-only'
    });

    const [sendMessage, { data, loading, error }] = useSendMessageMutation({
        variables: {
            threadID: message.threadID,
            message: message.body!
        }
    });

    useEffect(() => {
        if (!data && !loading && !error) {
            sendMessage();
        }
    }, [message]);

    useEffect(() => {
        if (data) {
            remove(message.threadID, message.id);
        }
    }, [data]);

    // This means the message was successfully sent, and is no longer an optimistic message:
    if (data) {
        return null;
    }

    return (
        <Optimistic error={!!error}>
            <Comment
                author={me.data?.me.name}
                content={
                    error ? (
                        <div>
                            <StyledAlert
                                message={
                                    <div>
                                        Message failed to send
                                        <RetryButton>
                                            <Button
                                                onClick={() => sendMessage()}
                                                size="small"
                                                type="primary"
                                            >
                                                Retry
                                            </Button>
                                        </RetryButton>
                                    </div>
                                }
                                type="error"
                                showIcon
                            />
                            <div>{message.body}</div>
                        </div>
                    ) : (
                        message.body
                    )
                }
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

export default React.memo(OptimisticMessage);
