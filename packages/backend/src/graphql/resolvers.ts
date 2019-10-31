import twilio from '../twilio';
import { Message, Sender } from '../entity/Message';
import { Thread } from '../entity/Thread';
import { Connection } from 'typeorm';

type Context = { connection: Connection };

export default {
    Query: {
        async threads(_parent, _args, { connection }: Context) {
            const threadRepo = connection.getRepository(Thread);

            return threadRepo.find();
        }
    },
    Mutation: {
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

            await messageRepo.save(message);

            return message;
        }
    }
};
