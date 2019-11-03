import { gql } from 'apollo-server-koa';

export default gql`
    directive @auth on FIELD_DEFINITION

    enum Sender {
        SELF
        OTHER
    }

    type User {
        id: ID!
        name: String!
        email: String!
    }

    type JWT {
        token: String
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
        lastMessage: Message
        createdAt: String
        updatedAt: String
    }

    type Query {
        threads: [Thread!]! @auth
        thread(threadID: ID!): Thread @auth
        me: User @auth
    }

    type Mutation {
        createThread(to: String!): Thread @auth
        sendMessage(threadID: ID!, body: String!): Message @auth
        createUser(name: String!, email: String!, password: String!): JWT!
        login(email: String!, password: String!): JWT!
    }
`;
