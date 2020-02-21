import { useState, useCallback } from 'react';
// import Router from 'next/router';
import styled from 'styled-components';
import produce from 'immer';
import { Button, Card, List, Input, Skeleton, Alert, Spin } from 'antd';
import CreateThread from './CreateThread';
import { useThreadsQuery, useThreadUpdateSubscription } from '../../queries';
import ThreadItem from './ThreadItem';
import { FormOutlined } from '@ant-design/icons';
import Row from '../Row';

const THREADS_TO_LOAD = 10;

const LoadMoreContainer = styled.div`
    text-align: center;
    margin-top: 12px;
    height: 32px;
    line-height: 32px;
`;

export default function Threads() {
    const [creating, setCreating] = useState(false);
    const { data, error, loading, fetchMore } = useThreadsQuery({
        notifyOnNetworkStatusChange: true,
        variables: {
            first: THREADS_TO_LOAD
        },
    });

    useThreadUpdateSubscription();

    // useEffect(() => {
    //     if (data && data.threads.length) {
    //         Router.replace(`/inbox/${data.threads[0].id}`);
    //     }
    // }, [data, history]);

    const handleLoadMore = useCallback(() => {
        fetchMore({
            variables: {
                first: THREADS_TO_LOAD,
                after: data?.threads.pageInfo.endCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult!.threads.edges;
                const pageInfo = fetchMoreResult!.threads.pageInfo;

                return newEdges.length
                    ? produce(previousResult, draftState => {
                          draftState.threads.pageInfo = pageInfo;
                          draftState.threads.edges.push(...newEdges);
                      })
                    : previousResult;
            }
        });
    }, [data?.threads.pageInfo.endCursor]);

    const loadMore =
        !loading && data?.threads.pageInfo.hasNextPage ? (
            <LoadMoreContainer>
                <Button onClick={handleLoadMore}>Load More</Button>
            </LoadMoreContainer>
        ) : null;

    return (
        <Card>
            <Row after={<Button onClick={() => setCreating(true)} icon={<FormOutlined />} />}>
                <Input.Search placeholder="Search..." />
            </Row>
            {!data && loading ? (
                <Skeleton />
            ) : !data || error ? (
                <Alert
                    message="Sorry we couldn't load your messages."
                    description="Please try again later."
                    type="error"
                />
            ) : (
                <>
                    <List
                        loadMore={loadMore}
                        itemLayout="horizontal"
                        dataSource={data.threads.edges}
                        renderItem={({ node }) => <ThreadItem key={node.id} thread={node} />}
                    />
                    {loading && (
                        <LoadMoreContainer>
                            <Spin />
                        </LoadMoreContainer>
                    )}
                </>
            )}

            <CreateThread visible={creating} onClose={() => setCreating(false)} />
        </Card>
    );
}
