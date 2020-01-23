import React from 'react';
import styled from 'styled-components';
import { Typography, Input, Button, Form } from 'antd';
import { useForgotPasswordMutation } from '../queries';
import Spacing from '../Spacing';
import AuthForm from './AuthForm';
import Link from '../Link';
import { CheckCircleTwoTone } from '@ant-design/icons';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

const RightAlign = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Complete = styled.div`
    margin: 32px;
    display: flex;
    justify-content: center;
`;

export default function ForgotPassword() {
    const [forgotPassword, { data, loading }] = useForgotPasswordMutation();

    const onFinish = (values: Record<string, any>) => {
        forgotPassword({
            variables: {
                email: values.email
            }
        });
    };

    return (
        <AuthForm title="Forgot password">
            {data ? (
                <>
                    <Typography.Paragraph>
                        A confirmation has been sent to your email. Click the link in the email to
                        finish resetting your password
                    </Typography.Paragraph>
                    <Complete>
                        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 64 }} />
                    </Complete>
                </>
            ) : (
                <>
                    <Typography.Paragraph>
                        Enter the email you created your account with, and we will email you a link
                        to reset your password.
                    </Typography.Paragraph>
                    <Spacing top={2}>
                        <Form {...layout} name="login" onFinish={onFinish}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input autoFocus />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" disabled={loading}>
                                    Email Recovery Link
                                </Button>
                            </Form.Item>
                        </Form>
                    </Spacing>
                    <Spacing top={3}>
                        <RightAlign>
                            <Link to="/signin">Remembered your password? Sign in</Link>
                        </RightAlign>
                    </Spacing>
                </>
            )}
        </AuthForm>
    );
}
