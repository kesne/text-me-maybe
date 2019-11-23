import * as otplib from 'otplib';
import { MutationResolvers } from '../../generated-graphql';
import { Context } from './types';
import { User, AuthType } from '../../entity/User';
import { Thread } from '../../entity/Thread';
import { Message, Sender } from '../../entity/Message';

const MutationResolvers: MutationResolvers<Context> = {
    async signUp(_parent, { name, email, password }, { session, cookies }) {
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;

        await user.save();

        cookies.set('hasAccount', '1', { httpOnly: false, signed: false });
        session.userID = user.id;
        session.type = AuthType.FULL;

        return { ok: true };
    },

    async signIn(_parent, { email, password }, { session, cookies }) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('No user found.');
        }

        const passwordValid = await user.checkPassword(password);

        if (!passwordValid) {
            throw new Error('Invalid password.');
        }

        if (user.totpSecret) {
            session.userID = user.id;
            session.type = AuthType.TOTP;

            return {
                totpChallenge: true
            };
        }

        cookies.set('hasUser', '1', { httpOnly: false, signed: false });
        session.userID = user.id;
        session.type = AuthType.FULL;

        return { ok: true };
    },

    async enableTotp(_parent, { secret, token }, { user }) {
        if (user.totpSecret) {
            throw new Error('User already has TOTP enabled.');
        }

        // TODO: Move to user?
        const isValid = otplib.authenticator.verify({ secret, token });
        if (!isValid) {
            throw new Error('Invalid TOTP');
        }
        user.totpSecret = secret;
        await user.save();
        return { ok: true };
    },

    async exchangeTOTP(_parent, { token }, { session, cookies }) {
        const user = await User.fromTOTPSession(session as any, token);

        if (!user) {
            throw new Error('Failed to get user.');
        }

        cookies.set('hasUser', '1', { httpOnly: false, signed: false });
        session.userID = user.id;
        session.type = AuthType.FULL;

        return { ok: true };
    },

    async createThread(_parent, { name, to, message: messageText }, { user }) {
        const thread = new Thread();
        thread.phoneNumber = '+16264657420';
        thread.recipient = to;
        thread.user = user;
        thread.name = name;

        const message = new Message();
        message.sender = Sender.Self;
        message.body = messageText;
        message.thread = thread;

        await thread.save();
        await message.save();

        return thread;
    },

    async sendMessage(_parent, { threadID, body }) {
        const thread = await Thread.findOne(threadID);

        if (!thread) {
            throw new Error('No thread found for ID.');
        }

        const message = new Message();
        message.thread = thread;
        message.sender = Sender.Self;
        message.body = body;

        return await message.save();
    },
    async markMessageAsSeen(_parent, { id }, { user }) {
        const message = await Message.findOne({
            where: {
                id,
                user
            }
        });

        if (!message) {
            throw new Error('No message found');
        }

        message.seen = true;

        return await message.save();
    },
    async endThread(_parent, { id }, { user }) {
        const thread = await Thread.findOne({
            where: {
                id,
                user
            }
        });

        if (!thread) {
            throw new Error('Unknown thread ID');
        }

        thread.ended = true;

        return await thread.save();
    },
    async deleteThread(_parent, { id }, { user }) {
        const thread = await Thread.findOne({
            where: {
                id,
                user
            }
        });

        if (!thread) {
            throw new Error('Unknown thread ID');
        }

        await thread.remove();

        return { ok: true };
    },
};

export default MutationResolvers;
