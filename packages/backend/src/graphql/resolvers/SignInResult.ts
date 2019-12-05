import { SignInResultResolvers } from '../../generated-graphql';
import { Context } from '../../types';

const SignInResultResolvers: SignInResultResolvers<Context> = {
    __resolveType(parent) {
        return 'totpChallenge' in parent ? 'TOTPChallenge' : 'Result';
    }
};

export default SignInResultResolvers;
