import twilio from '../twilio';
import { Message, Sender } from '../entity/Message';
import { Thread } from '../entity/Thread';
import { Connection } from 'typeorm';
import { User } from '../entity/User';

type Context = {
    user: User;
    connection: Connection;
};

export default {
    Query: {
        me(_parent, _args, { user }: Context) {
            return user;
        },
        async thread(_parent, { threadID }: { threadID: string }, { connection }: Context) {
            const threadRepo = connection.getRepository(Thread);
            return threadRepo.findOne(threadID);
        },
        async threads(_parent, _args, { connection }: Context) {
            const threadRepo = connection.getRepository(Thread);

            return await threadRepo
                .createQueryBuilder('thread')
                .leftJoin('thread.messages', 'messages')
                .addOrderBy('messages.createdAt', 'DESC')
                .getMany();
        }
    },
    Mutation: {
        async createUser(_parent, { name, email, password }, { connection }: Context) {
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
        async login(_parent, { email, password }, { connection }: Context) {
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
        async createThread(_parent, { to }, { connection }: Context) {
            const threadRepo = connection.getRepository(Thread);

            const thread = new Thread();
            thread.phoneNumber = '+16264657420';
            thread.recipient = to;
            return threadRepo.save(thread);
        },
        async sendMessage(_parent, { threadID, body }, { connection }: Context) {
            const threadRepo = connection.getRepository(Thread);
            const messageRepo = connection.getRepository(Message);

            const thread = await threadRepo.findOne(threadID);

            if (!thread) {
                throw new Error('No thread found for ID.');
            }

            const twilioMessage = await twilio.messages.create({
                body,
                from: '+16264657420',
                to: '+15108170536'
            });

            // TODO: Eventually track the twilio ID:
            const message = new Message();
            message.thread = thread;
            message.body = twilioMessage.body;
            message.sender = Sender.SELF;

            return await messageRepo.save(message);
        }
    },
    Thread: {
        lastMessage(parent: Thread, _args, { connection }: Context) {
            const messageRepo = connection.getRepository(Message);

            return messageRepo.findOne({
                where: {
                    threadId: parent.id
                },
                order: {
                    createdAt: 'DESC'
                }
            });
        },
        messages(parent: Thread, _args, { connection }: Context) {
            const messageRepo = connection.getRepository(Message);

            return messageRepo.find({
                where: {
                    threadId: parent.id
                },
                order: {
                    createdAt: 'DESC'
                }
            });
        }
    },
    Message: {
        sender(parent: Message) {
            return Sender[parent.sender];
        }
    }
};
