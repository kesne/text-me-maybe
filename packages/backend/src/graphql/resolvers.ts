import { Resolvers } from '../generated-graphql';
import { Message, Sender } from '../entity/Message';
import { Thread } from '../entity/Thread';
import { Connection } from 'typeorm';
import { User } from '../entity/User';

type Context = {
    user: User;
    connection: Connection;
};

const resolvers: Resolvers<Context> = {
    Query: {
        me(_parent, _args, { user }: Context) {
            return user;
        },
        async thread(_parent, { threadID }, { user, connection }) {
            const threadRepo = connection.getRepository(Thread);
            return threadRepo.findOne({
                where: {
                    id: threadID,
                    userId: user.id
                }
            });
        },
        async threads(_parent, _args, { user, connection }) {
            const threadRepo = connection.getRepository(Thread);

            return await threadRepo
                .createQueryBuilder('thread')
                .where('thread.userId = :userId', { userId: user.id })
                .leftJoin('thread.messages', 'messages')
                .addOrderBy('messages.createdAt', 'DESC')
                .getMany();
        }
    },
    Mutation: {
        async signUp(_parent, { name, email, password }, { connection }: Context) {
            const userRepo = connection.getRepository(User);

            const user = new User();
            user.name = name;
            user.email = email;
            user.password = password;

            await userRepo.save(user);

            return {
                token: user.token()
            };
        },
        async signIn(_parent, { email, password }, { connection }: Context) {
            const userRepo = connection.getRepository(User);
            const user = await userRepo.findOne({ where: { email } });

            if (!user) {
                throw new Error('No user found.');
            }

            const passwordValid = await user.checkPassword(password);

            if (!passwordValid) {
                throw new Error('Invalid password.');
            }

            return {
                token: user.token()
            };
        },
        async createThread(_parent, { to, message }, { user, connection }: Context) {
            const threadRepo = connection.getRepository(Thread);
            const messageRepo = connection.getRepository(Message);

            const thread = new Thread();
            thread.phoneNumber = '+16264657420';
            thread.recipient = to;
            thread.user = user;

            const initialMessage = new Message();
            initialMessage.sender = Sender.Self;
            initialMessage.body = message;
            initialMessage.thread = thread;

            await threadRepo.save(thread);
            await messageRepo.save(initialMessage);

            return thread;
        },
        async sendMessage(_parent, { threadID, body }, { connection }) {
            const threadRepo = connection.getRepository(Thread);
            const messageRepo = connection.getRepository(Message);

            const thread = await threadRepo.findOne(threadID);

            if (!thread) {
                throw new Error('No thread found for ID.');
            }

            const message = new Message();
            message.thread = thread;
            message.sender = Sender.Self;
            message.body = body;

            return await messageRepo.save(message);
        }
    },
    Thread: {
        lastMessage(parent, _args, { connection }) {
            const messageRepo = connection.getRepository(Message);

            return messageRepo
                .createQueryBuilder('message')
                .where('message.threadId = :threadId', { threadId: parent.id })
                .addOrderBy('message.createdAt', 'DESC')
                .getOne();
        },
        messages(parent, _args, { connection }) {
            const messageRepo = connection.getRepository(Message);

            return messageRepo
                .createQueryBuilder('message')
                .where('message.threadId = :threadId', { threadId: parent.id })
                .addOrderBy('message.createdAt', 'DESC')
                .getMany();
        }
    }
};

export default resolvers;
