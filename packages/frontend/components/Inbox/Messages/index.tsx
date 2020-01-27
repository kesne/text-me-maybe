import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Spin, Card } from 'antd';
import Message from './Message';
import SendMessage from './SendMessage';
import { useMessagesQuery } from '../../../queries';
import FetchMore from './FetchMore';
import Header from './Header';
import ThreadEnded from './ThreadEnded';

const StyledCard = styled(Card)`
    overflow: hidden;
    .ant-card-body {
        padding-top: 0;
        overflow: hidden;
        height: 100%;
        display: flex;
    }
`;

const Wrapper = styled.div`
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
        <>
            <Header thread={data.thread} />
            <StyledCard>
                <Wrapper>
                    <Container>
                        {data.thread.messages.map(message => (
                            <Message key={message.id} thread={data.thread} message={message} />
                        ))}
                        <FetchMore onMore={() => {}} />
                    </Container>

                    {data.thread.ended ? (
                        <ThreadEnded />
                    ) : (
                        <SendMessage threadID={threadID} refetch={refetch} />
                    )}
                </Wrapper>
            </StyledCard>
        </>
    );
}
