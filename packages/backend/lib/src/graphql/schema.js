"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_koa_1 = require("apollo-server-koa");
exports.default = apollo_server_koa_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    enum Sender {\n        SELF\n        OTHER\n    }\n\n    type Message {\n        id: ID!\n        body: String!\n        sender: Sender!\n        createdAt: String\n        updatedAt: String\n    }\n\n    type Thread {\n        id: ID!\n        phoneNumber: String!\n        recipient: String!\n        messages: [Message!]\n        createdAt: String\n        updatedAt: String\n    }\n\n    type Query {\n        threads: [Thread!]!\n    }\n\n    type Mutation {\n        createThread(to: String!): Thread\n        sendMessage(id: ID!, body: String!): Message\n    }\n"], ["\n    enum Sender {\n        SELF\n        OTHER\n    }\n\n    type Message {\n        id: ID!\n        body: String!\n        sender: Sender!\n        createdAt: String\n        updatedAt: String\n    }\n\n    type Thread {\n        id: ID!\n        phoneNumber: String!\n        recipient: String!\n        messages: [Message!]\n        createdAt: String\n        updatedAt: String\n    }\n\n    type Query {\n        threads: [Thread!]!\n    }\n\n    type Mutation {\n        createThread(to: String!): Thread\n        sendMessage(id: ID!, body: String!): Message\n    }\n"])));
var templateObject_1;
