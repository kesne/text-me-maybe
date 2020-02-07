import { useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Spin, Card } from 'antd';
import SendMessage from './SendMessage';
import { useThreadQuery } from '../../queries';
import Header from './Header';
import ThreadEnded from './ThreadEnded';
import MessageList from './MessageList';

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

    const [{ data, fetching, error }] = useThreadQuery({
        variables: {
            threadID
        }
    });

    useEffect(() => {
        if (data && !data.thread) {
            Router.replace('/inbox');
        }
    }, [data]);

    if (error) {
        return <div>Un oh! {error}</div>;
    }

    if (fetching || !data || !data.thread) {
        return <Spin size="large" />;
    }

    return (
        <>
            <Header thread={data.thread} />
            <StyledCard>
                <Wrapper>
                    <Container>
                        <MessageList thread={data.thread} />
                    </Container>

                    {data.thread.ended ? <ThreadEnded /> : <SendMessage threadID={threadID} />}
                </Wrapper>
            </StyledCard>
        </>
    );
}
