import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Message from './Message';

export const MESSAGES = gql`
    query {
        messages {
            body
            sender
        }
    }
`;

export default function Messages() {
    const { loading, error, data } = useQuery(MESSAGES);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {data.messages.reverse().map(message => (
                <Message message={message} />
            ))}
        </div>
    );
}
