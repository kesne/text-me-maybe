import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    BeforeInsert
} from 'typeorm';
import { Thread } from './Thread';
import twilio from '../twilio';

export enum Sender {
    Self = 'SELF',
    Other = 'OTHER'
}

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    body!: string;

    @Column('varchar')
    sender!: Sender;

    @ManyToOne(() => Thread, thread => thread.messages)
    thread!: Thread;

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;

    @BeforeInsert()
    async sendMessage() {
        const twilioReponse = await twilio.messages.create({
            body: this.body,
            from: this.thread.phoneNumber,
            to: this.thread.recipient
        });

        // Re-set the body to whatever twilio accepted, not the raw body:
        this.body = twilioReponse.body;
    }
}
