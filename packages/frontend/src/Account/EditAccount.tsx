import React, { useState } from 'react';
import { Button, Input, Form, PageHeader } from 'antd';
import Spacing from '../Spacing';
import { User, useUpdateAccountMutation } from '../queries';

type Props = {
    me: User;
};

export default function EditAccount({ me }: Props) {
    const [name, setName] = useState(me.name);
    const [email, setEmail] = useState(me.email);
    const [updateAccount, { data, loading }] = useUpdateAccountMutation({
        variables: {
            name,
            email
        }
    });

    function handleEdit() {
        updateAccount();
    }

    return (
        <PageHeader title="Your Account">
            <Spacing top={2}>
                <Form>
                    <Form.Item label="Name">
                        <Input
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Button onClick={handleEdit} disabled={loading} type="primary">
                        Save Changes
                    </Button>
                </Form>
            </Spacing>
        </PageHeader>
    );
}
