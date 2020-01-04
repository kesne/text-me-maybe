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
import { PhoneNumber } from './PhoneNumber';

@Entity()
export class Thread extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

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

    @ManyToOne(
        () => PhoneNumber,
        phoneNumber => phoneNumber.threads
    )
    phoneNumber!: PhoneNumber;

    async getNumber() {
        if (this.phoneNumber) return this.phoneNumber.phoneNumber;

        const number = await PhoneNumber.findOne({ where: { threads: this } });
        return number?.phoneNumber || 'FIXME';
    }

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;
}
