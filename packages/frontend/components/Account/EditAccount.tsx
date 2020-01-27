import React from 'react';
import { Button, Input, Form, PageHeader, Spin } from 'antd';
import Spacing from '../../src/Spacing';
import { useUpdateAccountMutation, useMeQuery } from '../../queries';

export default function EditAccount() {
    const { data, loading } = useMeQuery();
    const [updateAccount, updateAccountState] = useUpdateAccountMutation();

    function handleFinish(values: Record<string, any>) {
        updateAccount({
            variables: {
                name: values.name,
                email: values.email
            }
        });
    }

    if (loading) {
        return <Spin />;
    }

    if (!data) {
        return <div>No dataz?</div>;
    }

    return (
        <PageHeader title="Your Account">
            <Spacing top={2}>
                <Form
                    initialValues={{
                        name: data.me.name,
                        email: data.me.email
                    }}
                    onFinish={handleFinish}
                >
                    <Form.Item label="Name">
                        <Input placeholder="Name" disabled={updateAccountState.loading} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input placeholder="Email" disabled={updateAccountState.loading} />
                    </Form.Item>
                    <Button disabled={updateAccountState.loading} type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form>
            </Spacing>
        </PageHeader>
    );
}
