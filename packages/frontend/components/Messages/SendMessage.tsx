import { useRef } from 'react';
import { Form, Input, Button } from 'antd';
import Row from '../Row';
import { useStore } from '../utils/messagesToSendStore';

type Props = {
    threadID: number;
};

export default function SendMessage({ threadID }: Props) {
    const add = useStore(state => state.add);
    const inputRef = useRef<Input>(null);
    const [form] = Form.useForm();

    async function handleFinish(values: Record<string, any>) {
        add(threadID, values.message);

        form.resetFields();

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
                <Form.Item name="message">
                    <Input
                        ref={inputRef}
                        placeholder="Message..."
                        size="large"
                        autoComplete="off"
                    />
                </Form.Item>
            </Row>
        </Form>
    );
}
