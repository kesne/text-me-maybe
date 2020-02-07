import { PubSub } from 'apollo-server-koa';

export const TYPES = {
    NEW_MESSAGE: 'NEW_MESSAGE'
};

export default new PubSub();
