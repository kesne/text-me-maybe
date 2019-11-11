import ApolloClient from 'apollo-boost';
import auth from './auth';

export default new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    request(operation) {
        if (auth.get()) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${auth.get()}`
                }
            });
        }
    },
    onError(error) {
        if (error.graphQLErrors) {
            error.graphQLErrors.forEach(graphQLError => {
                if (graphQLError.extensions && graphQLError.extensions.code === 'UNAUTHENTICATED') {
                    auth.clear();
                }
            });
        }
    }
});
