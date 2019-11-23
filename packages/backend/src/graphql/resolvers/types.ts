import { Context as KoaContext } from 'koa';
import { User } from '../../entity/User';

export type Context = {
    user: User;
    session: Record<string, string | number | undefined | null>;
    cookies: KoaContext['cookies'];
};
