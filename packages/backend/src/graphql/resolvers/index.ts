import { Resolvers } from '../../schema.graphql';
import ThreadResolvers from './Thread';
import QueryResolvers from './Query';
import MutationResolvers from './Mutation';
import { Context } from '../../types';
import SubscriptionResolvers from './Subscription';
import UserResolvers from './User';

const resolvers: Resolvers<Context> = {
    Query: {
        ...QueryResolvers
    },
    Mutation: {
        ...MutationResolvers
    },
    Thread: {
        ...ThreadResolvers
    },
    Subscription: {
        ...SubscriptionResolvers
    },
    User: {
        ...UserResolvers
    }
};

export default resolvers;
