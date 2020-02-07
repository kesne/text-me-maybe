import { useEffect } from 'react';
import { Modal, Form, Input, Typography } from 'antd';
import { useDisableTotpMutation } from '../../queries';

type Props = {
    onClose(): void;
};

export default function DisableTOTP({ onClose }: Props) {
    const [form] = Form.useForm();
    const [{ data, fetching }, disableTOTP] = useDisableTotpMutation();

    useEffect(() => {
        if (data) {
            onClose();
        }
    }, [data, onClose]);

    async function handleOk() {
        const values = await form.validateFields();

        await disableTOTP({
            password: values.password
        });
    }

    return (
        <Modal
            title="Disable Two Factor Auth"
            visible
            onCancel={onClose}
            onOk={handleOk}
            confirmLoading={fetching}
        >
            <Typography.Paragraph>
                Please enter your password to disable TOTP on your account.
            </Typography.Paragraph>
            <Form form={form} layout="vertical" name="disable-totp">
                <Form.Item label="Password" name="password">
                    <Input
                        type="password"
                        size="large"
                        placeholder="6 digit code..."
                        required
                        autoFocus
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
