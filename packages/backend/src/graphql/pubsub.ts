import { PubSub } from 'apollo-server-koa';

export const TYPES = {
    NEW_MESSAGE: 'NEW_MESSAGE',
    THREAD_UPDATE: 'THREAD_UPDATE'
};

export default new PubSub();
