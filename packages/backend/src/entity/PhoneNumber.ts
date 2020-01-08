import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BaseEntity,
    Not,
    In
} from 'typeorm';
import { Thread } from './Thread';
import twilio from '../twilio';
import { requireAck } from '../purchaseLock';

@Entity()
export class PhoneNumber extends BaseEntity {
    static async getOrCreateForRecipient(recipient: string) {
        const threads = await Thread.find({
            where: { recipient },
            relations: ['phoneNumber']
        });

        const phoneNumberIdsWithRecipient = threads
            .map(thread => thread.phoneNumber?.id)
            .filter(Boolean);

        const phoneNumberDenyList = phoneNumberIdsWithRecipient.length
            ? {
                  id: phoneNumberIdsWithRecipient.length
                      ? Not(In(phoneNumberIdsWithRecipient))
                      : undefined
              }
            : {};

        let phoneNumber = await PhoneNumber.findOne({
            where: {
                ...phoneNumberDenyList,
                allocating: true,
                phoneNumber: Not(recipient)
            }
        });

        if (phoneNumber) return phoneNumber;

        await requireAck('Purchasing a new phone number from Twilio.');

        const [availableNumber] = await twilio
            .availablePhoneNumbers('US')
            .local.list({ limit: 1, smsEnabled: true });
        const twilioNumber = await twilio.incomingPhoneNumbers.create({
            // TODO: Need better naming
            friendlyName: availableNumber.friendlyName + ' (DEV)',
            phoneNumber: availableNumber.phoneNumber,
            smsUrl: 'https://text-me-maybe.ngrok.io/api/incoming-sms'
        });

        phoneNumber = new PhoneNumber();
        phoneNumber.twilioSid = twilioNumber.sid;
        phoneNumber.phoneNumber = twilioNumber.phoneNumber;
        return await phoneNumber.save();
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    twilioSid!: string;

    @Column({ unique: true })
    phoneNumber!: string;

    @Column({ default: true })
    allocating!: boolean;

    @OneToMany(
        () => Thread,
        thread => thread.phoneNumber
    )
    threads!: Thread[];

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;
}
