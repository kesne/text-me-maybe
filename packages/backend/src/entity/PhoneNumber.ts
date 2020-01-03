import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BaseEntity
} from 'typeorm';
import { Thread } from './Thread';

@Entity()
export class PhoneNumber extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    twilioSid!: string;

    @Column()
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
