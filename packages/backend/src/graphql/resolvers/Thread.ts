import { Message } from '../../entity/Message';
import { ThreadResolvers } from '../../schema.graphql';
import { Context } from '../../types';
import { Thread } from '../../entity/Thread';

const ThreadResolvers: ThreadResolvers<Context> = {
    lastMessage(parent) {
        // TODO: Move into the Message Model:
        return Message.createQueryBuilder('message')
            .where('message."threadId" = :threadId', { threadId: parent.id })
            .addOrderBy('message.createdAt', 'DESC')
            .getOne();
    },
    messages(parent) {
        // TODO: Move into the Message Model:
        return Message.createQueryBuilder('message')
            .where('message."threadId" = :threadId', { threadId: parent.id })
            .addOrderBy('message.createdAt', 'DESC')
            .getMany();
    },
    number(parent: Thread) {
        return parent.getNumber();
    }
};

export default ThreadResolvers;
