import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from 'typeorm';
import { Thread } from './Thread';

export enum Sender {
    SELF,
    OTHER
}

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    body!: string;

    @Column('int')
    sender!: Sender;

    @ManyToOne(() => Thread, thread => thread.messages)
    thread!: Thread;

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: number;
}
