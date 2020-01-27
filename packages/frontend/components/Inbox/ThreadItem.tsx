import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import { Thread } from '../../queries';

type Props = {
    thread: Partial<Thread>;
};

const StyledLink = styled(Link)`
    display: block;
    border-bottom: 1px solid #f0f0f0;
    &:last-child {
        border-bottom: none;
    }
`;

const Badge = styled.div`
    height: 8px;
    width: 8px;
    border-radius: 8px;
    background-color: blue;
`;

export default function ThreadItem({ thread }: Props) {
    return (
        <StyledLink to={`/inbox/${thread.id}`}>
            <List.Item>
                <List.Item.Meta title={thread.name} description={thread.lastMessage?.body} />
                {!thread.lastMessage?.body && <Badge />}
            </List.Item>
        </StyledLink>
    );
}
