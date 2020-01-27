import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSendMessageMutation } from '../../../queries';
import Row from '../../../src/Row';

type Props = {
    threadID: number;
    refetch: () => void;
};

export default function SendMessage({ threadID, refetch }: Props) {
    const [form] = Form.useForm();
    const [sendMessage, { loading, data, error }] = useSendMessageMutation({
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

    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data, refetch]);

    async function handleFinish(values: Record<string, any>) {
        await sendMessage({
            variables: {
                threadID,
                message: values.message
            }
        });

        form.resetFields();
    }

    return (
        <Form form={form} onFinish={handleFinish}>
            <Row
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
                    noStyle
                >
                    <Input placeholder="Message..." disabled={loading} size="large" />
                </Form.Item>
            </Row>
        </Form>
    );
}
