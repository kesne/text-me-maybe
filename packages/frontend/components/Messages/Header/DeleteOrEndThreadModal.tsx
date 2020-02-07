import { useEffect } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Modal, Typography } from 'antd';
import {
    Thread,
    ThreadsDocument,
    ThreadsQuery,
    EndThreadDocument,
    DeleteThreadDocument
} from '../../../queries';

type Props = {
    thread: Partial<Thread>;
    onClose(): void;
    mode: 'end' | 'delete';
};

// This is kinda similar to how we will handle internationalization with a collection of translated strings,
// rather than have them all defiend inline.
const COPY = {
    end: {
        title: (name?: string) => `End thread "${name}"`,
        okButton: 'End Thread',
        body:
            'Ending a thread will prevent the other person from messaging you again! Are you sure that you want to do this?'
    },
    delete: {
        title: (name?: string) => `Delete thread "${name}"`,
        okButton: 'Delete Thread',
        body: 'Deleting a thread will remove it forever! Are you sure you want to do this?'
    }
};

export default function DeleteOrEndThreadModal({ mode, thread, onClose }: Props) {
    const translations = COPY[mode];

    const [action, { data, loading }] = useMutation(
        mode === 'end' ? EndThreadDocument : DeleteThreadDocument,
        {
            variables: { id: thread.id as number },
            update(cache) {
                // No special cache update logic for ending threads:
                if (mode === 'end') {
                    return;
                }

                const data = cache.readQuery<ThreadsQuery>({
                    query: ThreadsDocument
                });

                if (!data) return;

                cache.writeQuery({
                    query: ThreadsDocument,
                    data: {
                        ...data,
                        threads: data.threads.filter(t => t.id !== thread.id)
                    }
                });
            }
        }
    );

    useEffect(() => {
        if (data) {
            if (mode === 'delete') {
                Router.replace('/inbox');
            }
            onClose();
        }
    }, [data, mode, onClose, history]);

    return (
        <Modal
            visible
            title={translations.title(thread.name)}
            onCancel={onClose}
            onOk={() => action()}
            confirmLoading={loading}
        >
            <Typography.Paragraph>{translations.body}</Typography.Paragraph>
        </Modal>
    );
}
