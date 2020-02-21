import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    BaseEntity,
    AfterInsert
} from 'typeorm';
import { Message } from './Message';
import { User } from './User';
import { PhoneNumber } from './PhoneNumber';
import twilio from '../twilio';
import pubsub, { TYPES } from '../graphql/pubsub';

@Entity()
export class Thread extends BaseEntity {
    static async formatRecipient(recipient: string) {
        const lookup = await twilio.lookups.phoneNumbers(recipient).fetch({ countryCode: 'US' });
        return lookup.phoneNumber;
    }

    static async userCanAccessThread(id: number, user: User) {
        const thread = await this.findOne(id, { relations: ['user'] });
        if (!thread) {
            return false;
        }

        const threadUser = await thread.user;

        return threadUser.id === user.id;
    }

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
    user!: Promise<User>;

    @OneToMany(
        () => Message,
        message => message.thread
    )
    messages!: Message[];

    @ManyToOne(
        () => PhoneNumber,
        phoneNumber => phoneNumber.threads
    )
    phoneNumber!: Promise<PhoneNumber>;

    async getNumber() {
        const number = await this.phoneNumber;
        return number.phoneNumber;
    }

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;


    @AfterInsert()
    publishUpdate() {
        pubsub.publish(TYPES.THREAD_UPDATE, {
            threadUpdate: this
        });
    }
}
