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
import { handle } from './purchaseLock';
import { twiml } from 'twilio';
import { Thread } from './entity/Thread';
import { PhoneNumber } from './entity/PhoneNumber';
import { Message, Sender } from './entity/Message';
import cookie from 'cookie';
import { SESSION_NAME } from './constants';

const app = new Koa();
const router = new Router();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        auth: AuthDirective
    },
    subscriptions: {
        path: '/api/graphql/subscriptions',
        onConnect: async (_connectionParams, _websocket, context) => {
            // TODO: Use KeyGrip to verify the cookie:
            const cookies = cookie.parse(context.request.headers.cookie!);
            const sessionID = cookies[SESSION_NAME];
            const sessionData = await redis.get(sessionID);
            if (!sessionData) {
                throw new Error('Could not authenticate from session.');
            }

            const session = JSON.parse(sessionData);
            const user = await User.fromSession(session);

            if (!user) {
                throw new Error('Session did not contain a user.');
            }

            return {
                user,
                session
            };
        }
    },
    context: ({ ctx, connection }) => {
        if (connection?.context) {
            return connection.context;
        }

        return {
            user: ctx.user,
            session: ctx.session,
            cookies: ctx.cookies
        };
    }
});

// TODO: Why is this defined up here?
const auth: Koa.Middleware = async (ctx, next) => {
    ctx.user = await User.fromSession(ctx.session);

    return next();
};

app.keys = ['Some key here ignore'];

const SESSION_CONFIG = {
    key: SESSION_NAME,
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

router.get('/api/ack', ctx => {
    handle.ack();
    ctx.body = 'Acknowledged!';
});

router.post('/api/incoming-sms', async ctx => {
    const phoneNumber = await PhoneNumber.findOne({
        where: [
            {
                phoneNumber: ctx.request.body.To
            }
        ]
    });

    if (phoneNumber) {
        const thread = await Thread.findOne({
            where: {
                recipient: ctx.request.body.From,
                phoneNumber: phoneNumber,
                ended: false
            }
        });

        if (thread) {
            const message = new Message();
            message.sender = Sender.Other;
            message.body = ctx.request.body.Body;
            message.thread = thread;

            await message.save();
        }
    }

    const response = new twiml.MessagingResponse();
    ctx.type = 'text/xml';
    ctx.body = response.toString();
});

app.use(
    cors({
        credentials: true
    })
);

app.use(session(SESSION_CONFIG, app));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

async function main() {
    const connection = await createConnection(ormconfig);

    app.use((ctx, next) => {
        ctx.connection = connection;
        return next();
    });

    app.use(auth);

    server.applyMiddleware({ app, path: '/api/graphql' });

    console.log('Connected to the database.');

    const httpServer = app.listen(1337, () => {
        console.log('Koa server listening on port 1337');
    });

    server.installSubscriptionHandlers(httpServer);
}

main().catch(err => console.error(err));
