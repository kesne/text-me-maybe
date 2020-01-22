import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Spacing from '../Spacing';
import Row from '../Row';
import Link from '../Link';
import { useSignInMutation } from '../queries';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

type Props = {
    onSignIn(): void;
    onTOTPChallenge(): void;
};

export default function EmailPassword({ onSignIn, onTOTPChallenge }: Props) {
    const [signIn, { data, loading }] = useSignInMutation();

    useEffect(() => {
        if (data) {
            if ('totpChallenge' in data.signIn) {
                onTOTPChallenge();
            } else {
                onSignIn();
            }
        }
    }, [data, onSignIn, onTOTPChallenge]);

    const onFinish = (values: Record<string, string>) => {
        signIn({
            variables: {
                email: values.email,
                password: values.password
            }
        });
    };

    return (
        <>
            <Form {...layout} name="login" onFinish={onFinish}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input autoFocus />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" disabled={loading}>
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
            <Spacing top={3}>
                <Row
                    after={
                        <Link to="/signup">
                            Don't have an account? Sign Up
                        </Link>
                    }
                >
                    <Link to="/forgot">
                        Forgot password?
                    </Link>
                </Row>
            </Spacing>
        </>
    );
}
