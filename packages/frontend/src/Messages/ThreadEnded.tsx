import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const Message = styled.div`
    display: flex;
    justify-content: center;
    padding: 16px;
`;

export default function ThreadEnded() {
    return (
        <Message>
            <Typography.Text>Thread has ended.</Typography.Text>
        </Message>
    );
}
