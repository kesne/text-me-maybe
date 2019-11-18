import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    BaseEntity
} from 'typeorm';
import { Message } from './Message';
import { User } from './User';

@Entity()
export class Thread extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    phoneNumber!: string;

    @Column()
    recipient!: string;

    @Column({ default: false })
    ended!: boolean;

    @ManyToOne(
        () => User,
        user => user.threads
    )
    user!: User;

    @OneToMany(
        () => Message,
        message => message.thread
    )
    messages!: Message[];

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;
}
