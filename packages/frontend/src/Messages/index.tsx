import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Spin, Card } from 'antd';
import Message from './Message';
import SendMessage from './SendMessage';
import { useMessagesQuery } from '../queries';
import FetchMore from './FetchMore';
import Header from './Header';
import YouAre from './YouAre';
import ThreadEnded from './ThreadEnded';

const StyledCard = styled(Card)`
    overflow: hidden;
    .ant-card-body {
        overflow: hidden;
        height: 100%;
        display: flex;
    }
`;

const Wrapper = styled.div`
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
`;

export default function Messages() {
    const { id } = useParams() as Record<string, string>;
    const threadID = Number(id);

    const { loading, data, error, refetch } = useMessagesQuery({
        variables: {
            threadID
        }
    });

    if (loading) {
        return <Spin size="large" />;
    }

    if (!data) {
        return <div>Un oh! {error}</div>;
    }

    if (!data.thread) {
        return <Redirect to="/inbox" />;
    }

    return (
        <StyledCard>
            <Wrapper>
                <Header thread={data.thread} />
                <Container>
                    {data.thread.messages.map(message => (
                        <Message key={message.id} message={message} />
                    ))}
                    <FetchMore onMore={() => {}} />
                    <YouAre phoneNumber={data.thread.number} createdAt={data.thread.createdAt} />
                </Container>

                {data.thread.ended ? (
                    <ThreadEnded />
                ) : (
                    <SendMessage threadID={threadID} refetch={refetch} />
                )}
            </Wrapper>
        </StyledCard>
    );
}
