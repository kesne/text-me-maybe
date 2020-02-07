import { FindConditions, LessThan } from 'typeorm';
import { QueryResolvers } from '../../schema.graphql';
import { Thread } from '../../entity/Thread';
import { Context } from '../../types';
import { Message } from '../../entity/Message';
import Cursor from '../../utils/Cursor';

const QueryResolvers: QueryResolvers<Context> = {
    me(_parent, _args, { user }) {
        return user;
    },
    async thread(_parent, { threadID }, { user }) {
        return Thread.findOne({
            where: {
                id: threadID,
                userId: user.id
            }
        });
    },
    async threads(_parent, _args, { user }) {
        // TODO: Move this into thread:
        return await Thread.createQueryBuilder('thread')
            .where('thread."userId" = :userId', { userId: user.id })
            .leftJoin('thread.messages', 'messages')
            .addOrderBy('"messages"."createdAt"', 'DESC')
            .getMany();
    },
    async onboardTotp(_parent, _args, { user }) {
        if (user.totpSecret) {
            throw new Error('TOTP Already Enabled');
        }

        return {
            name: user.name,
            secret: user.generateTotpSecret()
        };
    },

    async moreMessages(_parent, { threadID, first, after }, { user }) {
        // TODO: Scope by user to avoid reading other peoples messages PROBABLY
        const where: FindConditions<Message> = {
            thread: { id: threadID }
        };

        if (after) {
            const cursor = Cursor.parse(after);
            where.id = LessThan(cursor.last);
        }

        const messages = await Message.find({
            where,
            order: {
                id: 'DESC',
                createdAt: 'DESC'
            },
            take: first
        });

        return {
            id: threadID,
            pageInfo: {
                // TODO: When we don't have messages, what is the correct behavior for the cursor?
                // Maybe just returning the parent cursor, or returning null if we don't have one?
                // (null meaning we don't have any results so we don't have a cursor because we can't paginate).
                endCursor: new Cursor(
                    messages[0]?.id,
                    messages[messages.length - 1]?.id
                ).toString(),
                hasNextPage: messages.length
            },
            edges: messages.map(message => ({ node: message }))
        };
    }
};

export default QueryResolvers;
