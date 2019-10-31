"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Thread_1 = require("./Thread");
var Sender;
(function (Sender) {
    Sender[Sender["SELF"] = 0] = "SELF";
    Sender[Sender["OTHER"] = 1] = "OTHER";
})(Sender = exports.Sender || (exports.Sender = {}));
var Message = /** @class */ (function () {
    function Message() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Message.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], Message.prototype, "body", void 0);
    __decorate([
        typeorm_1.Column('int'),
        __metadata("design:type", Number)
    ], Message.prototype, "sender", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Thread_1.Thread; }, function (thread) { return thread.messages; }),
        __metadata("design:type", Thread_1.Thread)
    ], Message.prototype, "thread", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Message.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Number)
    ], Message.prototype, "updatedAt", void 0);
    Message = __decorate([
        typeorm_1.Entity()
    ], Message);
    return Message;
}());
exports.Message = Message;
