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
import twilio from '../twilio';

@Entity()
export class Thread extends BaseEntity {
    static async formatRecipient(recipient: string) {
        const lookup = await twilio.lookups.phoneNumbers(recipient).fetch({ countryCode: 'US' });
        return lookup.phoneNumber;
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
    phoneNumber!: Promise<PhoneNumber>;

    async getNumber() {
        const number = await this.phoneNumber;
        return number.phoneNumber;
    }

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;
}
