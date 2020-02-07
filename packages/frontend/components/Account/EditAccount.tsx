import { Button, Input, Form, PageHeader, Spin } from 'antd';
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
        <PageHeader title="Your Account" ghost={false}>
            <Form
                initialValues={{
                    name: data.me.name,
                    email: data.me.email
                }}
                onFinish={handleFinish}
            >
                <Form.Item label="Name" name="name">
                    <Input placeholder="Name" disabled={updateAccountState.loading} />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input placeholder="Email" disabled={updateAccountState.loading} />
                </Form.Item>
                <Form.Item>
                    <Button disabled={updateAccountState.loading} type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </PageHeader>
    );
}
