import { useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import produce from 'immer';
import { useSendMessageMutation, ThreadMessagesDocument, Sender, ThreadMessagesQuery } from '../../queries';
import Row from '../Row';

type Props = {
    threadID: number;
};

let oid = -1;
function getOptimisticId() {
    return oid--;
}

// TODO: Eventual optimizations that we can make:
// Rather than having the optimistic UI write into the message thread directly,
// we probably should have it write into a client-only query, which is always just
// rendered at the bottom of the list. We should also write in the state of the
// mutation (loading, error), and give granular retry options.

export default function SendMessage({ threadID }: Props) {
    const inputRef = useRef<Input>(null);
    const previousMessageRef = useRef('');
    const [form] = Form.useForm();

    const [sendMessage, { error }] = useSendMessageMutation({
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
                            ...data.sendMessage
                        }
                    }
                }
            });

            const threadMessages = cache.readQuery<ThreadMessagesQuery>({
                query: ThreadMessagesDocument,
                variables: { id: threadID }
            });

            if (!threadMessages) {
                return;
            }

            const nextState = produce(threadMessages, (draftState) => {
                // Only insert if we do not already have the message in the thread:
                if (
                    !draftState.thread.messages.edges.find(
                        ({ node }) => node.id === data.sendMessage.id
                    )
                ) {
                    draftState.thread.messages.edges.unshift({
                        __typename: 'MessageEdge',
                        node: data.sendMessage
                    });
                }
            });

            cache.writeQuery({
                query: ThreadMessagesDocument,
                variables: { id: threadID },
                data: nextState
            });
        }
    });

    useEffect(() => {
        if (error && previousMessageRef.current) {
            form.setFieldsValue({
                message: previousMessageRef.current,
            });
        }
    }, [error]);


    async function handleFinish(values: Record<string, any>) {
        sendMessage({
            variables: {
                threadID,
                message: values.message
            },
            optimisticResponse: {
                __typename: 'Mutation',
                sendMessage: {
                    __typename: 'Message',
                    id: getOptimisticId(),
                    body: values.message,
                    sender: Sender.Self,
                    seen: true,
                    createdAt: String(Date.now()),
                    updatedAt: null
                }
            }
        });

        form.resetFields();

        previousMessageRef.current = values.message;

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        <Form form={form} onFinish={handleFinish}>
            <Row
                alignItems="end"
                after={
                    <Button htmlType="submit" type="primary" size="large">
                        Send
                    </Button>
                }
            >
                <Form.Item
                    name="message"
                    validateStatus={error && 'error'}
                    help={error && error.message}
                >
                    <Input ref={inputRef} placeholder="Message..." size="large" autoComplete="off" />
                </Form.Item>
            </Row>
        </Form>
    );
}
