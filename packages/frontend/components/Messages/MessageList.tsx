import { useCallback, useEffect } from 'react';
import { Spin, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import {
    useThreadMessagesQuery,
    Thread,
    NewMessageDocument,
    SubscriptionNewMessageArgs,
    NewMessageSubscription
} from '../../queries';
import Message from './Message';
import useReversed from '../utils/useReversed';

type Props = {
    thread: Pick<Thread, 'id' | 'name'>;
};

const MESSAGES_TO_LOAD = 10;

export default function MessageList({ thread }: Props) {
    const { data, loading, error, fetchMore, subscribeToMore } = useThreadMessagesQuery({
        variables: {
            id: thread.id,
            first: MESSAGES_TO_LOAD
        }
    });

    useEffect(() => {
        return subscribeToMore<NewMessageSubscription, SubscriptionNewMessageArgs>({
            document: NewMessageDocument,
            variables: { threadID: thread.id },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { newMessage } = subscriptionData.data;

                return {
                    ...prev,
                    thread: {
                        ...prev.thread,
                        messages: {
                            ...prev.thread.messages,
                            edges: [newMessage, ...prev.thread.messages.edges]
                        }
                    }
                };
            }
        });
    }, [subscribeToMore, thread.id]);

    const handleLoadMore = useCallback(() => {
        fetchMore({
            variables: {
                id: thread.id,
                first: MESSAGES_TO_LOAD,
                after: data?.thread.messages.pageInfo.endCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult!.thread.messages.edges;
                const pageInfo = fetchMoreResult!.thread.messages.pageInfo;

                return newEdges.length
                    ? {
                          thread: {
                              __typename: previousResult.thread.__typename,
                              id: previousResult.thread.id,
                              messages: {
                                    __typename: previousResult.thread.messages.__typename,
                                  pageInfo,
                                  edges: [...previousResult.thread.messages.edges, ...newEdges]
                              }
                          }
                      }
                    : previousResult;
            }
        });
    }, [data?.thread.messages.pageInfo.endCursor, thread.id]);

    // TODO: Ideally we really need a better way to represent this data so that we don't need to constantly reverse it:
    const messages = useReversed(data?.thread.messages.edges ?? []);

    if (loading) {
        return <Skeleton active />
    }

    if (!data || error) {
        return <div>WAT HAPPEN</div>;
    }

    return (
        <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={data.thread.messages.pageInfo.hasNextPage}
            useWindow={false}
            isReverse={true}
        >
            <List
                dataSource={messages}
                renderItem={({ node: message }) => (
                    <Message key={message.id} thread={thread} message={message} />
                )}
            >
                {loading && (
                    <div>
                        <Spin />
                    </div>
                )}
            </List>
        </InfiniteScroll>
    );
}
