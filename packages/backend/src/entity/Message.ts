import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    BeforeInsert,
    BaseEntity
} from 'typeorm';
import { Thread } from './Thread';
import twilio from '../twilio';

export enum Sender {
    Self = 'SELF',
    Other = 'OTHER'
}

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    body!: string;

    @Column('varchar')
    sender!: Sender;

    @ManyToOne(
        () => Thread,
        thread => thread.messages,
        { onDelete: 'CASCADE' }
    )
    thread!: Thread;

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;

    @Column({
        default: true
    })
    seen!: boolean;

    @BeforeInsert()
    async sendMessage() {
        // We only want to send messages on Twilio if they're outgoing messages.
        if (this.sender != Sender.Self) {
            return;
        }

        const fromNumber = await this.thread.getNumber();

        const twilioReponse = await twilio.messages.create({
            body: this.body,
            from: fromNumber,
            to: this.thread.recipient
        });

        // Re-set the body to whatever twilio accepted, not the raw body:
        this.body = twilioReponse.body;
    }
}
