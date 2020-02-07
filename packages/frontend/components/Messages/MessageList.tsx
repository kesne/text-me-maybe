import { Spin, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import {
    useMoreMessagesQuery,
    Thread
    // NewMessageDocument,
    // SubscriptionNewMessageArgs,
    // NewMessageSubscription
} from '../../queries';
import Message from './Message';
import { useCallback, useMemo, useState } from 'react';

type Props = {
    thread: Pick<Thread, 'id' | 'name'>;
};

const MESSAGES_TO_LOAD = 10;

export default function MessageList({ thread }: Props) {
    const [cursor, setCursor] = useState<string | null>(null);
    const [{ data, fetching, error }] = useMoreMessagesQuery({
        variables: {
            threadID: thread.id,
            first: MESSAGES_TO_LOAD,
            after: cursor
        }
    });

    // useEffect(() => {
    //     return subscribeToMore<NewMessageSubscription, SubscriptionNewMessageArgs>({
    //         document: NewMessageDocument,
    //         variables: { threadID: thread.id },
    //         updateQuery: (prev, { subscriptionData }) => {
    //             if (!subscriptionData.data) return prev;
    //             const { newMessage } = subscriptionData.data;

    //             return {
    //                 ...prev,
    //                 moreMessages: {
    //                     ...prev.moreMessages,
    //                     messages: [newMessage, ...prev.moreMessages.messages]
    //                 }
    //             };
    //         }
    //     });
    // }, [subscribeToMore, thread.id]);

    // TODO: Ideally we really need a better way to represent this data so that we don't need to constantly reverse it:
    const messages = useMemo(() => [...(data?.moreMessages.edges ?? [])].reverse(), [
        data?.moreMessages.edges
    ]);

    const handleLoadMore = useCallback(() => {
        if (data?.moreMessages.pageInfo.hasNextPage && data?.moreMessages.pageInfo.endCursor) {
            setCursor(data?.moreMessages.pageInfo.endCursor);
        }
    }, [data?.moreMessages.pageInfo.endCursor, thread.id]);

    if (!data || error) {
        return <div>WAT HAPPEN</div>;
    }

    return (
        <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={data.moreMessages.pageInfo.hasNextPage}
            useWindow={false}
            isReverse={true}
        >
            <List
                dataSource={messages}
                renderItem={({ node: message }) => (
                    <Message key={message.id} thread={thread} message={message} />
                )}
            >
                {fetching && (
                    <div>
                        <Spin />
                    </div>
                )}
            </List>
        </InfiniteScroll>
    );
}
