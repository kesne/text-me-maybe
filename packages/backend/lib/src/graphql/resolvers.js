"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var twilio_1 = __importDefault(require("../twilio"));
var Message_1 = require("../entity/Message");
var Thread_1 = require("../entity/Thread");
exports.default = {
    Query: {
        threads: function (_parent, _args, _a) {
            var connection = _a.connection;
            return __awaiter(this, void 0, void 0, function () {
                var threadRepo;
                return __generator(this, function (_b) {
                    threadRepo = connection.getRepository(Thread_1.Thread);
                    return [2 /*return*/, threadRepo.find()];
                });
            });
        }
        // messages: async (_parent, _args, { connection }) => {
        //     const messageRepo = connection.getRepository(Message);
        //     return await messageRepo.find();
        // }
    },
    Mutation: {
        createThread: function (_parent, _a, _b) {
            var to = _a.to;
            var connection = _b.connection;
            return __awaiter(this, void 0, void 0, function () {
                var threadRepo, thread;
                return __generator(this, function (_c) {
                    threadRepo = connection.getRepository(Thread_1.Thread);
                    thread = new Thread_1.Thread();
                    thread.phoneNumber = '+16264657420';
                    thread.recipient = to;
                    return [2 /*return*/, threadRepo.save(thread)];
                });
            });
        },
        sendMessage: function (_parent, _a, _b) {
            var id = _a.id, body = _a.body;
            var connection = _b.connection;
            return __awaiter(this, void 0, void 0, function () {
                var threadRepo, messageRepo, thread, twilioMessage, message;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            threadRepo = connection.getRepository(Thread_1.Thread);
                            messageRepo = connection.getRepository(Message_1.Message);
                            return [4 /*yield*/, threadRepo.findOne(id)];
                        case 1:
                            thread = _c.sent();
                            if (!thread) {
                                throw new Error('No thread found for ID.');
                            }
                            return [4 /*yield*/, twilio_1.default.messages.create({
                                    body: body,
                                    from: '+16264657420',
                                    to: '+15108170536'
                                })];
                        case 2:
                            twilioMessage = _c.sent();
                            message = new Message_1.Message();
                            message.thread = thread;
                            message.body = twilioMessage.body;
                            message.sender = Message_1.Sender.SELF;
                            return [4 /*yield*/, messageRepo.save(message)];
                        case 3:
                            _c.sent();
                            return [2 /*return*/, message];
                    }
                });
            });
        }
    }
};
