import { Message } from '../../entity/Message';
import { ThreadResolvers } from '../../schema.graphql';
import { Context } from '../../types';
import { Thread } from '../../entity/Thread';
import { FindConditions, LessThan } from 'typeorm';
import { parse, serialize } from '../../utils/cursor';

const ThreadResolvers: ThreadResolvers<Context> = {
    lastMessage(parent) {
        // TODO: Move into the Message Model:
        return Message.createQueryBuilder('message')
            .where('message."threadId" = :threadId', { threadId: parent.id })
            .addOrderBy('message.createdAt', 'DESC')
            .getOne();
    },

    async messages(parent, { first, after }) {
        const where: FindConditions<Message> = {
            thread: { id: parent.id }
        };

        if (after) {
            const afterID = parse(after);
            where.id = LessThan(afterID);
        }

        const messages = await Message.find({
            where,
            order: {
                id: 'DESC',
                createdAt: 'DESC'
            },
            // NOTE: We load an additional node, so that we can determine if there is a next page.
            take: first + 1
        });

        const hasNextPage = messages.length === first + 1
        // If we have a next page, then we loaded 1 extra result, so remove it from the result set:
        if (hasNextPage) {
            messages.pop();
        }

        return {
            pageInfo: {
                startCursor: serialize(messages[0].id),
                endCursor: serialize(messages[messages.length - 1].id),
                hasNextPage,
                // TODO: Actually implement this:
                hasPreviousPage: false
            },
            edges: messages.map(message => ({ cursor: serialize(message.id), node: message }))
        };
    },

    number(parent: Thread) {
        return parent.getNumber();
    }
};

export default ThreadResolvers;
