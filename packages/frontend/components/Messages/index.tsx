import { useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Card, Alert } from 'antd';
import SendMessage from './SendMessage';
import { useThreadQuery } from '../../queries';
import Header from './Header';
import ThreadEnded from './ThreadEnded';
import MessageList from './MessageList';
import Spinner from '../Spinner';

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

type Props = {
    id: string;
};

export default function Messages({ id }: Props) {
    const threadID = Number(id);

    const { data, loading, error } = useThreadQuery({
        variables: {
            id: threadID
        }
    });

    useEffect(() => {
        if (data && !data.thread) {
            Router.replace('/inbox');
        }
    }, [data]);

    if (error) {
        return (
            <Alert
                message="Sorry, we couldn't load those messages."
                description={error.message}
                type="error"
            />
        );
    }

    if (loading || !data || !data?.thread) {
        return (
            <Card>
                <Spinner size="large" />
            </Card>
        );
    }

    return (
        <>
            <Header thread={data.thread} />
            <StyledCard>
                <Wrapper>
                    <Container>
                        <MessageList thread={data.thread} />
                    </Container>

                    {data?.thread.ended ? <ThreadEnded /> : <SendMessage threadID={threadID} />}
                </Wrapper>
            </StyledCard>
        </>
    );
}
