import { FindConditions, LessThan } from 'typeorm';
import { QueryResolvers } from '../../schema.graphql';
import { Thread } from '../../entity/Thread';
import { Context } from '../../types';
import { Message } from '../../entity/Message';
import { RawSqlResultsToEntityTransformer } from 'typeorm/query-builder/transformer/RawSqlResultsToEntityTransformer';
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

    async threads(_parent, { first, after }, { user }) {
        // TODO: Maybe move this logic this into thread???
        let threadQuery = Thread.createQueryBuilder('thread')
            .where('thread."userId" = :userId', { userId: user.id })
            .leftJoin('thread.messages', 'messages')
            .addSelect('max("messages"."id")', 'maxMessageId')
            .addOrderBy('"maxMessageId"', 'DESC')
            // NOTE: We load an additional node, so that we can determine if there is a next page.
            .limit(first + 1)
            .addGroupBy('thread.id');

        if (after) {
            threadQuery = threadQuery.having('max("messages"."id") < :after', {
                after: parse(after)
            });
        }

        const { raw: rawThreads, entities: threads } = await threadQuery.getRawAndEntities();

        const hasNextPage = threads.length === first + 1;
        // If we have a next page, then we loaded 1 extra result, so remove it from the result set:
        if (hasNextPage) {
            threads.pop();
            rawThreads.pop();
        }

        return {
            // TODO: This will break if the threads are empty!!!!!
            pageInfo: {
                startCursor: serialize(rawThreads[0].maxMessageId),
                endCursor: serialize(rawThreads[threads.length - 1].maxMessageId),
                hasNextPage,
                hasPreviousPage: false
            },

            edges: threads.map((thread, i) => ({
                cursor: serialize(rawThreads[i].maxMessageId),
                node: thread
            }))
        };
    }
};

export default QueryResolvers;
