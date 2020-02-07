import { useEffect } from 'react';
import styled from 'styled-components';
import { Modal, InputNumber, Form, Spin, Typography } from 'antd';
import { useOnboardTotpQuery, useEnableTotpMutation } from '../../queries';

type Props = {
    onClose(): void;
};

const Code = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const QRCode = styled.img`
    display: block;
    margin: 16px auto;
`;

export default function OnboardTOTP({ onClose }: Props) {
    const [form] = Form.useForm();
    const [{ data, fetching }] = useOnboardTotpQuery({
        requestPolicy: 'network-only'
    });

    const [totpEnableResult, enableTotp] = useEnableTotpMutation();

    async function handleOk() {
        const values = await form.validateFields();

        await enableTotp({
            token: String(values.token),
            secret: data ? data.onboardTotp.secret : ''
        });
    }

    useEffect(() => {
        if (totpEnableResult.data) {
            onClose();
        }
    }, [totpEnableResult.data, onClose]);

    if (fetching) {
        return <Spin />;
    }

    if (!data) {
        return <div>What happen</div>;
    }

    const OTP_DATA = `otpauth://totp/${data.onboardTotp.name}?secret=${data.onboardTotp.secret}`;

    return (
        <Modal
            visible
            title="Two Factor Auth Setup"
            onCancel={onClose}
            onOk={handleOk}
            confirmLoading={totpEnableResult.fetching}
        >
            <Form form={form} layout="vertical" name="totp">
                <Typography.Paragraph>
                    Scan this QR code in an authenticator app to enable Two Factor Authentication.
                    This will require you to enter a pin from the authenticator app every time you
                    sign in.
                </Typography.Paragraph>
                <QRCode
                    alt="Enable Two Factor Authentication"
                    src={`https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${OTP_DATA}`}
                />
                <Typography.Paragraph>
                    Or enter it manually:
                    <br />
                    <Code>
                        <Typography.Title level={3} code>
                            {data.onboardTotp.secret}
                        </Typography.Title>
                    </Code>
                </Typography.Paragraph>
                <Form.Item label="Token" name="token">
                    <InputNumber
                        size="large"
                        placeholder="6 digit code..."
                        maxLength={6}
                        pattern="[0-9]{6}"
                        required
                        autoFocus
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
