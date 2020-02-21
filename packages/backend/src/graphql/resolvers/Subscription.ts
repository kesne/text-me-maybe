import { withFilter } from 'apollo-server-koa';
import { Context } from '../../types';
import promiseWrappedIterator from '../../utils/promiseWrappedIterator';
import { Thread } from '../../entity/Thread';
import pubsub, { TYPES } from '../pubsub';
import { Message } from '../../entity/Message';

const SubscriptionResolvers = {
    threadUpdate: {
        subscribe: withFilter(
            () => pubsub.asyncIterator([TYPES.THREAD_UPDATE]),
            async (payload: { threadUpdate: Thread }, _args, context: Context) => {
                const threadUser = await payload.threadUpdate.user;
                return threadUser.id === context.user.id;
            }
        )
    },
    newMessage: {
        subscribe: withFilter(
            (_parent, args: { threadID: number }, context: Context) =>
                promiseWrappedIterator(
                    pubsub.asyncIterator([TYPES.NEW_MESSAGE]),
                    Thread.userCanAccessThread(args.threadID, context.user)
                ),
            (payload: { newMessage: { node: Message; cursor: string } }, variables) =>
                variables.threadID === payload.newMessage.node.thread?.id
        )
    }
};

export default SubscriptionResolvers;
