import ApolloClient from 'apollo-boost';
import Cookies from 'js-cookie';

export default new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    credentials: 'include',
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
