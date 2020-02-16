import { useCallback, useEffect } from 'react';
import { Spin, List, Skeleton } from 'antd';
import produce from 'immer';
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

export default function MessageList({ thread }: Props) {
    const { data, loading, error, fetchMore, subscribeToMore } = useThreadMessagesQuery({
        variables: {
            id: thread.id
        }
    });

    useEffect(() => {
        return subscribeToMore<NewMessageSubscription, SubscriptionNewMessageArgs>({
            document: NewMessageDocument,
            variables: { threadID: thread.id },
            updateQuery: (prevState, { subscriptionData }) => {
                if (!subscriptionData.data) return prevState;
                const { newMessage } = subscriptionData.data;

                return produce(prevState, draftState => {
                    // Only insert if we do not already have the message in the thread:
                    if (
                        !draftState.thread.messages.edges.find(
                            ({ node }) => node.id === newMessage.node.id
                        )
                    ) {
                        draftState.thread.messages.edges.unshift(newMessage);
                    }
                });
            }
        });
    }, [subscribeToMore, thread.id]);

    const handleLoadMore = useCallback(() => {
        fetchMore({
            variables: {
                id: thread.id,
                after: data?.thread.messages.pageInfo.endCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult!.thread.messages.edges;
                const pageInfo = fetchMoreResult!.thread.messages.pageInfo;

                return newEdges.length
                    ? produce(previousResult, draftState => {
                          draftState.thread.messages.pageInfo = pageInfo;
                          draftState.thread.messages.edges.push(...newEdges);
                      })
                    : previousResult;
            }
        });
    }, [data?.thread.messages.pageInfo.endCursor, thread.id]);

    // TODO: Ideally we really need a better way to represent this data so that we don't need to constantly reverse it:
    const messages = useReversed(data?.thread.messages.edges ?? []);

    if (loading) {
        return <Skeleton active />;
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
