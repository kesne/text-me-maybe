import React from 'react';
import { Typography } from 'antd';
import moment from 'moment';
import formatPhone from '../utils/formatPhone';

type Props = {
    phoneNumber: string;
    createdAt: string;
};

export default function YouAre({ phoneNumber, createdAt }: Props) {
    return (
        <>
            <Typography.Text type="secondary">
                You are {formatPhone(phoneNumber)}
            </Typography.Text>
            <Typography.Text type="secondary">
                Conversation started {moment(Number(createdAt)).fromNow()}
            </Typography.Text>
        </>
    );
}
