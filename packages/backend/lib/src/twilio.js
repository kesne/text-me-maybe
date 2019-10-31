"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var twilio_1 = __importDefault(require("twilio"));
exports.default = twilio_1.default(process.env.TWILIO_APP_SID, process.env.TWILIO_APP_TOKEN);
