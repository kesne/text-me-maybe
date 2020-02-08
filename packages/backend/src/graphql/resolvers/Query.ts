import { FindConditions, LessThan } from 'typeorm';
import { QueryResolvers } from '../../schema.graphql';
import { Thread } from '../../entity/Thread';
import { Context } from '../../types';
import { Message } from '../../entity/Message';
import { parse, serialize } from '../../utils/cursor';

const QueryResolvers: QueryResolvers<Context> = {
    me(_parent, _args, { user }) {
        return user;
    },

    async thread(_parent, { id }, { user }) {
        return Thread.findOne({
            where: {
                id,
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
};

export default QueryResolvers;
