import React from 'react';
import Text from '@airbnb/lunar/lib/components/Text';
import moment from 'moment';
import formatPhone from '../utils/formatPhone';

type Props = {
    phoneNumber: string;
    createdAt: string;
};

export default function YouAre({ phoneNumber, createdAt }: Props) {
    return (
        <>
            <Text centerAlign small muted>
                You are {formatPhone(phoneNumber)}
            </Text>
            <Text centerAlign small muted>
                Conversation started {moment(Number(createdAt)).fromNow()}
            </Text>
        </>
    );
}
