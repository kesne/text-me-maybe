import 'reflect-metadata';
import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { ApolloServer } from 'apollo-server-koa';
import { createConnection } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import config from '../ormconfig.json';
import { User } from './entity/User';
import AuthDirective from './graphql/AuthDirective';

const app = new Koa();
const router = new Router();

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    schemaDirectives: {
        auth: AuthDirective
    },
    context: ({ ctx }) => {
        return {
            user: ctx.user
        };
    }
});

const auth: Koa.Middleware = async (ctx, next) => {
    if (ctx.get('Authorization')) {
        // Get the token from the header:
        const token = ctx.get('Authorization').slice('Bearer '.length);
        ctx.user = await User.fromToken(token);
    }
    return next();
};

app.use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

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

createConnection(config as SqliteConnectionOptions)
    .then(async connection => {
        app.use((ctx, next) => {
            ctx.connection = connection;
            return next();
        }).use(auth);

        server.applyMiddleware({ app });

        console.log('Connected to the database.');

        app.listen(1337, () => {
            console.log('Koa server listening on port 1337');
        });
    })
    .catch(error => console.log(error));
