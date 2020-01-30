import ApolloClient from 'apollo-boost';
import isomorphicFetch from 'isomorphic-fetch';
import { signOut, checkCookies } from './user';

export default new ApolloClient({
    uri: '/api/graphql',
    credentials: 'include',
    fetch: (input: RequestInfo, init?: RequestInit) =>
        isomorphicFetch(input, init).then(res => {
            checkCookies();
            return res;
        }),
    onError(error) {
        if (error.graphQLErrors) {
            error.graphQLErrors.forEach(graphQLError => {
                if (graphQLError.extensions && graphQLError.extensions.code === 'UNAUTHENTICATED') {
                    signOut();
                }
            });
        }
    }
});
