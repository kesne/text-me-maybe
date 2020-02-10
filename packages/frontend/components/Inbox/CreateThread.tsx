import { useEffect } from 'react';
import Router from 'next/router';
import { Modal, Typography, Form, Input } from 'antd';
import PhoneNumber from 'awesome-phonenumber';
import client from '../utils/client';
import { useCreateThreadMutation, ThreadsDocument } from '../../queries';

type Props = {
    visible: boolean;
    onClose: () => void;
};

export default function CreateThread({ visible, onClose }: Props) {
    const [form] = Form.useForm();

    const [createThread, { loading, data }] = useCreateThreadMutation();

    useEffect(() => {
        if (data) {
            // Force a refetch of threads from network
            // TODO: Eventually this should probably just write into the cache directly,
            // but for now I'll just re-fetch all of the threads after creating one.
            client.query({ query: ThreadsDocument, fetchPolicy: 'network-only' });
            Router.push(`/inbox/${data.createThread.id}`);
            onClose();
        }
    }, [data, onClose]);

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible]);

    async function handleOk() {
        const values = await form.validateFields();

        await createThread({
            variables: {
                name: values.name,
                phoneNumber: values.phoneNumber,
                message: values.message
            }
        });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const formatter = PhoneNumber.getAsYouType('US');
        [...e.target.value]
            .filter(char => char.match(/\d/))
            .slice(0, 10)
            .forEach(char => {
                formatter.addChar(char);
            });

        form.setFieldsValue({ phoneNumber: formatter.number() });
    }

    return (
        <Modal
            visible={visible}
            title="Create a new message thread"
            onCancel={onClose}
            onOk={handleOk}
            okText="Create Thread"
            confirmLoading={loading}
        >
            <Typography.Paragraph>
                Your messages will arrive from a unique phone number, and will not be associated
                with you.
            </Typography.Paragraph>
            <Form form={form} layout="vertical" name="create-thread">
                <Form.Item label="Name" name="name">
                    <Input autoFocus />
                </Form.Item>
                <Form.Item label="Phone Number" name="phoneNumber">
                    <Input onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Message" name="message">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}
