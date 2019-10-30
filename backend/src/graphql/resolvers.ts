import twilio from '../twilio';
import { Message } from '../entity/Message';

export default {
    Query: {
        messages: async (_parent, _args, { connection }) => {
            const messageRepo = connection.getRepository(Message);

            return await messageRepo.find();
        }
    },
    Mutation: {
        async sendMessage(_parent, { body }, { connection }) {
            const messageRepo = connection.getRepository(Message);

            const twilioMessage = await twilio.messages.create({
                body,
                from: '+16264657420',
                to: '+15108170536'
            });

            // TODO: Eventually track the twilio ID:
            const message = new Message();
            message.body = twilioMessage.body;

            await messageRepo.save(message);

            return message;
        }
    }
};
