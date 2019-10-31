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
var Message_1 = require("./Message");
var Thread = /** @class */ (function () {
    function Thread() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Thread.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Thread.prototype, "phoneNumber", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Thread.prototype, "recipient", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Message_1.Message; }, function (message) { return message.thread; }),
        __metadata("design:type", Array)
    ], Thread.prototype, "messages", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Thread.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Number)
    ], Thread.prototype, "updatedAt", void 0);
    Thread = __decorate([
        typeorm_1.Entity()
    ], Thread);
    return Thread;
}());
exports.Thread = Thread;
