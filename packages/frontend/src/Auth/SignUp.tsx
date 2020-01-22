import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button, Input } from 'antd';
import Spacing from '../Spacing';
import Link from '../Link';
import AuthForm from './AuthForm';
import { useSignUpMutation } from '../queries';
import HasUserContext from '../HasUserContext';

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
    const history = useHistory();
    const { setHasUser } = useContext(HasUserContext);
    const [signUp, { data, loading }] = useSignUpMutation();

    useEffect(() => {
        if (data) {
            setHasUser(true);
            history.push('/inbox');
        }
    }, [data, history, setHasUser]);

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
        <AuthForm title="Sign up">
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
                        Sign Up
                    </Button>
                </Form.Item>
                <Spacing top={3}>
                    <LinkContainer>
                        <Link to="/signin">Already have an account? Sign in</Link>
                    </LinkContainer>
                </Spacing>
            </Form>
        </AuthForm>
    );
}
