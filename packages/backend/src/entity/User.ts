import * as otplib from 'otplib';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    OneToMany,
    BaseEntity
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Thread } from './Thread';

// NOTE: This was chosed based on a stack overflow post. Probably should do more
// research if you ever deploy this for real.
const SALT_ROUNDS = 10;

export enum AuthType {
    FULL = 'FULL',
    TOTP = 'TOTP'
}

type Session = {
    userID: number;
    type: AuthType;
};

@Entity()
export class User extends BaseEntity {
    static async fromSession(session: Session): Promise<User | undefined> {
        if (session.userID && session.type === AuthType.FULL) {
            return await this.findOne(session.userID);
        }
        return;
    }

    static async fromTOTPSession(session: Session, token: string): Promise<User | undefined> {
        if (!session.userID || session.type !== AuthType.TOTP) {
            return;
        }

        const user = await this.findOne(session.userID);
        if (!user || !user.totpSecret) {
            return;
        }

        const isValid = otplib.authenticator.verify({ secret: user.totpSecret, token });
        if (!isValid) {
            return;
        }

        return user;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    passwordHash!: string;
    password?: string;

    // TODO: Encrypt this somehow.
    @Column({ nullable: true })
    totpSecret?: string;

    hasTOTP() {
        return !!this.totpSecret;
    }

    generateTotpSecret() {
        return otplib.authenticator.generateSecret();
    }

    async checkPassword(password: string) {
        return await bcrypt.compare(password, this.passwordHash);
    }

    @OneToMany(
        () => Thread,
        thread => thread.user
    )
    threads!: Thread[];

    @BeforeInsert()
    async performPasswordHash() {
        if (this.password) {
            // Just ensure that we don't keep the password on the model:
            const password = this.password;
            delete this.password;

            this.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        }
    }
}
