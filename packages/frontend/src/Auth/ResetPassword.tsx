import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import { useResetPasswordMutation } from '../queries';
import HasUserContext from '../HasUserContext';
import AuthForm from './AuthForm';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

export default function ResetPassword() {
    const params = useParams<{ uuid: string }>();
    const { setHasUser } = useContext(HasUserContext);
    const history = useHistory();
    const [resetPassword, { data, loading }] = useResetPasswordMutation({
        variables: {
            uuid: params.uuid
        }
    });

    useEffect(() => {
        resetPassword();
    }, [resetPassword]);

    useEffect(() => {
        if (data && data.resetPassword.complete) {
            // TODO: It's really annoying manually setting this hasUser context.
            // We probably should instead just have a standard way for GraphQL
            // to update this value directly, and trigger a re-render through children.
            setHasUser(true);
            history.push('/inbox');
        }
    }, [data, history, setHasUser]);

    const onFinish = (values: Record<string, string>) => {
        resetPassword({
            variables: {
                uuid: params.uuid,
                password: values.password
            }
        });
    };

    return (
        <AuthForm title="Password Reset">
            <Typography.Paragraph>
                You can set a new password for your account below, which can be used for all future
                sign-ins.
            </Typography.Paragraph>

            <Form {...layout} name="login" onFinish={onFinish}>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password autoFocus />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" disabled={loading}>
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </AuthForm>
    );
}
