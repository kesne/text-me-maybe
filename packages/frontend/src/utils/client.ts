import ApolloClient from 'apollo-boost';
import Cookies from 'js-cookie';
// @ts-ignore
import isomorphicFetch from 'isomorphic-fetch';

export default new ApolloClient({
    uri: '/api/graphql',
    credentials: 'include',
    fetch: isomorphicFetch,
    // TODO: The server should clear the cookie here:
    onError(error) {
        if (error.graphQLErrors) {
            error.graphQLErrors.forEach(graphQLError => {
                if (graphQLError.extensions && graphQLError.extensions.code === 'UNAUTHENTICATED') {
                    console.log('INVALID AUTH, CLEARING COOKIES FOR SHORT TERM');
                    Cookies.remove('hasUser');
                }
            });
        }
    }
});
