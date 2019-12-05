import React, { useState, useEffect } from 'react';
import Input from '@airbnb/lunar/lib/components/Input';
import Button from '@airbnb/lunar/lib/components/Button';
import Spacing from '@airbnb/lunar/lib/components/Spacing';
import Row from '@airbnb/lunar/lib/components/Row';
import Text from '@airbnb/lunar/lib/components/Text';
import Title from '@airbnb/lunar/lib/components/Title';
import Table from '@airbnb/lunar/lib/components/Table';
import { User, useUpdateAccountMutation } from '../queries';

type Props = {
    me: User;
    editing: boolean;
    onEditingChange(newEditing: boolean): void;
};

export default function EditAccount({ me, editing, onEditingChange }: Props) {
    const [name, setName] = useState(me.name);
    const [email, setEmail] = useState(me.email);
    const [updateAccount, { data, loading }] = useUpdateAccountMutation({
        variables: {
            name,
            email
        }
    });

    useEffect(() => {
        if (data) {
            onEditingChange(false);
        }
    }, [data, onEditingChange]);

    function handleEdit() {
        if (editing) {
            updateAccount();
        } else {
            onEditingChange(true);
        }
    }

    return (
        <div>
            <Row
                after={
                    <Button onClick={handleEdit} disabled={loading} inverted={!editing}>
                        {editing ? 'Save Changes' : 'Edit Account'}
                    </Button>
                }
            >
                <Title level={3}>Your Account</Title>
            </Row>
            <Spacing top={2}>
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                <Text bold>Name</Text>
                            </td>
                            <td>
                                {editing ? (
                                    <Input label="Name" value={name} onChange={setName} />
                                ) : (
                                    me.name
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Text bold>Email</Text>
                            </td>
                            <td>
                                {editing ? (
                                    <Input label="Email" value={email} onChange={setEmail} />
                                ) : (
                                    me.email
                                )}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Spacing>
        </div>
    );
}
