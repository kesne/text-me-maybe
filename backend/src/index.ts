import 'reflect-metadata';
import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { ApolloServer } from 'apollo-server-koa';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import { createConnection } from 'typeorm';

const app = new Koa();
const router = new Router();

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ ctx }) => {
        return { connection: ctx.connection };
    }
});

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

createConnection()
    .then(async connection => {
        app.use((ctx, next) => {
            ctx.connection = connection;
            return next();
        });

        server.applyMiddleware({ app });

        console.log('Connected to the database.');

        app.listen(1337, () => {
            console.log('Koa server listening on port 1337');
        });
    })
    .catch(error => console.log(error));
