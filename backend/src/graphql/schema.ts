import { gql } from 'apollo-server-koa';

export default gql`
    type Message {
        id: ID!
        body: String!
        createdAt: String
        updatedAt: String
    }

    type Query {
        messages: [Message!]
    }

    type Mutation {
        sendMessage(body: String!): Message
    }
`;
