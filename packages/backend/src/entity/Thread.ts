import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne
} from 'typeorm';
import { Message } from './Message';
import { User } from './User';

@Entity()
export class Thread {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    phoneNumber!: string;

    @Column()
    recipient!: string;

    @ManyToOne(() => User, user => user.threads)
    user!: User;

    @OneToMany(() => Message, message => message.thread)
    messages!: Message[];

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;
}
