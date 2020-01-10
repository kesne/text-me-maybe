import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@airbnb/lunar/lib/components/Modal';
import Button from '@airbnb/lunar/lib/components/Button';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
import Input from '@airbnb/lunar/lib/components/Input';
import Text from '@airbnb/lunar/lib/components/Text';
import Spacing from '@airbnb/lunar/lib/components/Spacing';
import client from '../utils/client';
import { useCreateThreadMutation, ThreadsDocument } from '../queries';
import PhoneNumber from 'awesome-phonenumber';

type Props = {
    onClose: () => void;
};

export default function CreateThread({ onClose }: Props) {
    const history = useHistory();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    // TODO: Eventually this should probably just write into the cache directly,
    // but for now I'll just re-fetch all of the threads after creating one.
    const [createThread, { loading, data }] = useCreateThreadMutation({
        variables: {
            name,
            phoneNumber,
            message
        }
    });

    function handleBlur() {
        const formattedNumber = new PhoneNumber(phoneNumber, 'US');
        if (formattedNumber.isValid()) {
            setPhoneNumberValid(true);
            setPhoneNumber(formattedNumber.getNumber('national'));
        } else {
            setPhoneNumberValid(false);
        }
    }

    useEffect(() => {
        if (data) {
            // Force a refetch of threads from network
            client.query({ query: ThreadsDocument, fetchPolicy: 'network-only' });
            history.push(`/inbox/${data.createThread.id}`);
            onClose();
        }
    }, [data, history, onClose]);

    return (
        <Modal
            title="Create a new message thread"
            onClose={onClose}
            footer={
                <ButtonGroup endAlign>
                    <Button onClick={onClose} inverted>
                        Cancel
                    </Button>
                    <Button onClick={() => createThread()} disabled={loading}>
                        Create Thread
                    </Button>
                </ButtonGroup>
            }
        >
            <Spacing bottom={2}>
                <Text large>
                    Message will arrive from a unique phone number, and will not be associated with
                    you.
                </Text>
            </Spacing>
            <Input label="Name" value={name} onChange={setName} disabled={loading} autoFocus />
            <Input
                label="Phone Number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                onBlur={handleBlur}
                disabled={loading}
                errorMessage={phoneNumberValid ? 'Please enter a valid phone number' : undefined}
            />
            <Input label="Message" value={message} onChange={setMessage} disabled={loading} />
        </Modal>
    );
}
