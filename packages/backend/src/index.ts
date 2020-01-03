import 'reflect-metadata';
import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import redisStore from 'koa-redis';
import { ApolloServer } from 'apollo-server-koa';
import { createConnection } from 'typeorm';
import redis from './redis';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { User } from './entity/User';
import AuthDirective from './graphql/AuthDirective';
import ormconfig from '../ormconfig';

const app = new Koa();
const router = new Router();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        auth: AuthDirective
    },
    context: ({ ctx }) => {
        return {
            user: ctx.user,
            session: ctx.session,
            cookies: ctx.cookies
        };
    }
});

const auth: Koa.Middleware = async (ctx, next) => {
    ctx.user = await User.fromSession(ctx.session);

    return next();
};

app.keys = ['Some key here ignore'];

const SESSION_CONFIG = {
    key: 'tmm:session',
    maxAge: 86400000 * 14,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,
    renew: false,
    store: redisStore({
        client: redis
    })
};

app.use(
    cors({
        credentials: true
    })
);
app.use(session(SESSION_CONFIG, app));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// TODO: Convert:
// app.post('/sms', (req, res) => {
//     const twiml = new MessagingResponse();

//     messages.push({
//         body: req.body.Body,
//         sender: false
//     });

//     twiml.message('The Robots are coming! Head for the hills!');

//     res.writeHead(200, { 'Content-Type': 'text/xml' });
//     res.end(twiml.toString());
// });

createConnection(ormconfig)
    .then(async connection => {
        app.use((ctx, next) => {
            ctx.connection = connection;
            return next();
        }).use(auth);

        server.applyMiddleware({ app, path: '/api/graphql' });

        console.log('Connected to the database.');

        app.listen(1337, () => {
            console.log('Koa server listening on port 1337');
        });
    })
    .catch(error => console.log(error));
