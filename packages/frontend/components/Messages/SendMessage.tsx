import { Form, Input, Button } from 'antd';
import { useSendMessageMutation } from '../../queries';
import Row from '../Row';

type Props = {
    threadID: number;
};

export default function SendMessage({ threadID }: Props) {
    const [form] = Form.useForm();
    const [sendMessage, { loading, error }] = useSendMessageMutation({
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

    console.log(error, error && error.message);

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
                    <Input placeholder="Message..." disabled={loading} size="large" />
                </Form.Item>
            </Row>
        </Form>
    );
}
