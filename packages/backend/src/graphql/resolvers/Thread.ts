import { Message } from '../../entity/Message';
import { ThreadResolvers } from '../../generated-graphql';
import { Context } from '../../types';

const ThreadResolvers: ThreadResolvers<Context> = {
    lastMessage(parent) {
        // TODO: Move into the Message Model:
        return Message.createQueryBuilder('message')
            .where('message.threadId = :threadId', { threadId: parent.id })
            .addOrderBy('message.createdAt', 'DESC')
            .getOne();
    },
    messages(parent) {
        // TODO: Move into the Message Model:
        return Message.createQueryBuilder('message')
            .where('message.threadId = :threadId', { threadId: parent.id })
            .addOrderBy('message.createdAt', 'DESC')
            .getMany();
    }
};

export default ThreadResolvers;
