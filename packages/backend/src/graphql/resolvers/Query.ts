import { QueryResolvers } from '../../generated-graphql';
import { Thread } from '../../entity/Thread';
import { Context } from '../../types';

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
            .where('thread.userId = :userId', { userId: user.id })
            .leftJoin('thread.messages', 'messages')
            .addOrderBy('messages.createdAt', 'DESC')
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
    }
};

export default QueryResolvers;
