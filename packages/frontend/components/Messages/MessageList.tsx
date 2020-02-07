import { Spin, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import {
    useMoreMessagesQuery,
    Thread,
    NewMessageDocument,
    SubscriptionNewMessageArgs,
    NewMessageSubscription
} from '../../queries';
import Message from './Message';
import { useCallback, useMemo, useState, useEffect } from 'react';

type Props = {
    thread: Pick<Thread, 'id' | 'name'>;
};

const MESSAGES_TO_LOAD = 10;

export default function MessageList({ thread }: Props) {
    // TODO: Eventually this can be part of the response:
    const [hasMore, setHasMore] = useState(true);

    const { data, loading, error, fetchMore, subscribeToMore } = useMoreMessagesQuery({
        variables: {
            threadID: thread.id,
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
                    moreMessages: {
                        ...prev.moreMessages,
                        messages: [newMessage, ...prev.moreMessages.messages]
                    }
                };
            }
        });
    }, [subscribeToMore, thread.id]);

    // TODO: Ideally we really need a better way to represent this data so that we don't need to constantly reverse it:
    const messages = useMemo(() => [...(data?.moreMessages.messages ?? [])].reverse(), [
        data?.moreMessages.messages
    ]);

    const handleLoadMore = useCallback(() => {
        fetchMore({
            variables: {
                threadID: thread.id,
                first: MESSAGES_TO_LOAD,
                after: data?.moreMessages.cursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const previousMoreMessages = previousResult.moreMessages;
                const newMessages = fetchMoreResult?.moreMessages.messages ?? [];
                const newCursor = fetchMoreResult?.moreMessages.cursor as string;

                // No new messages, so set hasMore to false:
                if (newMessages.length === 0) {
                    setHasMore(false);
                }

                return {
                    moreMessages: {
                        // By returning `cursor` here, we update the `fetchMore` function
                        // to the new cursor.
                        cursor: newCursor,
                        messages: [...previousMoreMessages.messages, ...newMessages],
                        __typename: previousMoreMessages.__typename
                    }
                };
            }
        });
    }, [data?.moreMessages.cursor, thread.id]);

    if (loading) {
        return <Spin size="large" />;
    }

    if (!data || error) {
        return <div>WAT HAPPEN</div>;
    }

    return (
        <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={hasMore}
            useWindow={false}
            isReverse={true}
        >
            <List
                dataSource={messages}
                renderItem={message => (
                    <Message key={message.id} thread={thread} message={message} />
                )}
            >
                {loading && hasMore && (
                    <div>
                        <Spin />
                    </div>
                )}
            </List>
        </InfiniteScroll>
    );
}
