import { Button, Input, Form, PageHeader, Spin } from 'antd';
import { useUpdateAccountMutation, useMeQuery } from '../../queries';

export default function EditAccount() {
    const [{ data, fetching }] = useMeQuery();
    const [updateAccountResult, updateAccount] = useUpdateAccountMutation();

    function handleFinish(values: Record<string, any>) {
        updateAccount({
            name: values.name,
            email: values.email
        });
    }

    if (fetching) {
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
                    <Input placeholder="Name" disabled={updateAccountResult.fetching} />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input placeholder="Email" disabled={updateAccountResult.fetching} />
                </Form.Item>
                <Form.Item>
                    <Button disabled={updateAccountResult.fetching} type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </PageHeader>
    );
}
