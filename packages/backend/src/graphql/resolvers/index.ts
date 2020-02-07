import { Resolvers } from '../../schema.graphql';
import ThreadResolvers from './Thread';
import QueryResolvers from './Query';
import MutationResolvers from './Mutation';
import SignInResultResolvers from './SignInResult';
import { Context } from '../../types';
import SubscriptionResolvers from './Subscription';

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
    SignInResult: {
        ...SignInResultResolvers
    },
    Subscription: {
        ...SubscriptionResolvers
    }
};

export default resolvers;
