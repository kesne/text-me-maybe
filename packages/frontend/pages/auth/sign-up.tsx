import { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Form, Button, Input } from 'antd';
import Spacing from '../../components/Spacing';
import Container from '../../components/Auth/Container';
import { useSignUpMutation } from '../../queries';
import Router from 'next/router';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

const LinkContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export default function SignUp() {
    const [signUp, { data, loading }] = useSignUpMutation();

    useEffect(() => {
        if (data) {
            Router.push('/inbox');
        }
    }, [data]);

    const onFinish = (values: Record<string, string>) => {
        signUp({
            variables: {
                name: values.name,
                email: values.email,
                password: values.password
            }
        });
    };

    return (
        <Container title="Sign up">
            <Form {...layout} name="signup" onFinish={onFinish}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input autoFocus />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
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
                        Sign Up
                    </Button>
                </Form.Item>
                <Spacing top={3}>
                    <LinkContainer>
                        <Link href="/auth/sign-in">Already have an account? Sign in</Link>
                    </LinkContainer>
                </Spacing>
            </Form>
        </Container>
    );
}
