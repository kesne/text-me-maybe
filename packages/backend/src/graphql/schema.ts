import { gql } from 'apollo-server-koa';

export default gql`
    enum Sender {
        SELF
        OTHER
    }

    type Message {
        id: ID!
        body: String!
        sender: Sender!
        createdAt: String
        updatedAt: String
    }

    type Thread {
        id: ID!
        phoneNumber: String!
        recipient: String!
        messages: [Message!]
        createdAt: String
        updatedAt: String
    }

    type Query {
        threads: [Thread!]!
    }

    type Mutation {
        createThread(to: String!): Thread
        sendMessage(threadID: ID!, body: String!): Message
    }
`;
