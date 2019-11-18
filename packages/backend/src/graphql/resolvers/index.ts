import { Resolvers } from '../../generated-graphql';
import ThreadResolvers from './Thread';
import QueryResolvers from './Query';
import MutationResolvers from './Mutation';
import { Context } from './types';

const resolvers: Resolvers<Context> = {
    Query: {
        ...QueryResolvers
    },
    Mutation: {
        ...MutationResolvers
    },
    Thread: {
        ...ThreadResolvers
    }
};

export default resolvers;
