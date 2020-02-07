// import isomorphicFetch from 'isomorphic-fetch';
// import ws from 'websocket';
// import { signOut, checkCookies } from './user';

import { createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { relayPagination } from '@urql/exchange-graphcache/extras';

const client = createClient({
    url: '/api/graphql',
    exchanges: [
        dedupExchange,
        cacheExchange({
            resolvers: {
                Query: {
                    moreMessages: relayPagination()
                }
            }
        }),
        fetchExchange
    ]
});

export default client;
