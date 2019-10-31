import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { Message } from './Message';

@Entity()
export class Thread {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    phoneNumber!: string;

    @Column()
    recipient!: string;

    @OneToMany(() => Message, message => message.thread)
    messages!: Promise<Message[]>;

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: number;
}
