import React from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import { Typography, Input, Button, Form } from 'antd';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheckAlt';
import { useForgotPasswordMutation } from '../queries';
import Spacing from '../Spacing';
import AuthForm from './AuthForm';
import Link from '../Link';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

export default function ForgotPassword() {
    const [classes, cx] = useStyles(theme => ({
        rightAlign: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        complete: {
            margin: theme.unit * 4,
            display: 'flex',
            justifyContent: 'center'
        }
    }));

    const [forgotPassword, { data, loading }] = useForgotPasswordMutation();

    const onFinish = () => {
        console.log('done');
    };

    return (
        <AuthForm title="Forgot password">
            {data ? (
                <>
                    <Typography.Paragraph>
                        A confirmation has been sent to your email. Click the link in the email to
                        finish resetting your password
                    </Typography.Paragraph>
                    <div className={cx(classes.complete)}>
                        <IconCheck color="green" size={64} />
                    </div>
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
                        <div className={cx(classes.rightAlign)}>
                            <Link to="/signin">
                                Remembered your password? Sign in
                            </Link>
                        </div>
                    </Spacing>
                </>
            )}
        </AuthForm>
    );
}
