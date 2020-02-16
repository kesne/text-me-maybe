import Link from 'next/link';
import styled from 'styled-components';
import { List, Badge } from 'antd';
import { Thread } from '../../queries';

type Props = {
    thread: Partial<Thread>;
};

const StyledLink = styled('a')`
    display: block;
    border-bottom: 1px solid #f0f0f0;
    &:last-child {
        border-bottom: none;
    }
`;

export default function ThreadItem({ thread }: Props) {
    return (
        <Link href="/inbox/[thread]" as={`/inbox/${thread.id}`}>
            <StyledLink>
                <List.Item>
                    <List.Item.Meta title={thread.name} description={thread.lastMessage?.body} />
                    <Badge dot={thread.lastMessage ? !thread.lastMessage.seen : false} />
                </List.Item>
            </StyledLink>
        </Link>
    );
}
