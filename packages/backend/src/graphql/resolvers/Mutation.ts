import { authenticator } from 'otplib';
import { MutationResolvers } from '../../schema.graphql';
import { Context } from '../../types';
import { User, AuthType } from '../../entity/User';
import { Thread } from '../../entity/Thread';
import { Message, Sender } from '../../entity/Message';
import { PasswordReset } from '../../entity/PasswordReset';
import { PhoneNumber } from '../../entity/PhoneNumber';

const RESULT_OK = { ok: true };

const MutationResolvers: MutationResolvers<Context> = {
    async signUp(_parent, { name, email, password }, { session, cookies }) {
        const user = new User();
        user.name = name;
        user.email = email;

        await user.setPassword(password);
        await user.save();

        user.signIn(session, cookies);

        return RESULT_OK;
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

        // Remove any password reset so that it is no longer valid after signing in:
        PasswordReset.removeForUser(user);

        if (user.totpSecret) {
            user.signIn(session, cookies, AuthType.TOTP);

            return {
                ok: true,
                requiresTOTP: true
            };
        }

        user.signIn(session, cookies);

        return {
            ok: true,
            requiresTOTP: false
        };
    },

    async enableTotp(_parent, { secret, token }, { user }) {
        if (user.totpSecret) {
            throw new Error('User already has TOTP enabled.');
        }

        // TODO: Move to user?
        const isValid = authenticator.verify({ secret, token });
        if (!isValid) {
            throw new Error('Invalid TOTP');
        }
        user.totpSecret = secret;
        await user.save();
        return RESULT_OK;
    },

    async disableTotp(_parent, { password }, { user }) {
        await user.disableTOTP(password);
        return RESULT_OK;
    },

    async exchangeTOTP(_parent, { token }, { session, cookies }) {
        const user = await User.fromTOTPSession(session as any, token);

        if (!user) {
            throw new Error('Failed to get user.');
        }

        user.signIn(session, cookies);

        return RESULT_OK;
    },

    // TODO: Validate phoneNumber "to" using twilio lookup API.
    async createThread(_parent, { name, to, message: messageText }, { user }) {
        const recipient = await Thread.formatRecipient(to);

        if (!recipient) {
            throw new Error('Invalid recipient!');
        }

        const phoneNumber = await PhoneNumber.getOrCreateForRecipient(recipient);

        const thread = new Thread();
        thread.phoneNumber = Promise.resolve(phoneNumber);
        thread.recipient = recipient;
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

        return RESULT_OK;
    },

    async updateAccount(_parent, { name, email }, { user }) {
        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        return await user.save();
    },

    async forgotPassword(_parent, { email }) {
        await PasswordReset.createForEmail(email);

        return RESULT_OK;
    },

    async resetPassword(_parent, { uuid, password }, { session, cookies }) {
        const reset = await PasswordReset.findOne({ where: { uuid }, relations: ['user'] });

        // TODO: Validate that the date that the password reset was created is with # of days:
        if (!reset) {
            throw new Error('Invalid password reset.');
        }

        if (password) {
            const user = await User.fromSession(session, AuthType.PASSWORD_RESET);

            if (!user) {
                throw new Error('Did not find a started password reset.');
            }

            // TODO: Why is this commented out??
            // await reset.remove();

            await user.setPassword(password);
            await user.save();

            user.signIn(session, cookies);
            return { complete: true };
        }

        reset.user.signIn(session, cookies, AuthType.PASSWORD_RESET);
        return { complete: false };
    }
};

export default MutationResolvers;
