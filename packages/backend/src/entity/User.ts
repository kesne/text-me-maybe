import crypto from 'crypto';
import * as otplib from 'otplib';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    OneToMany,
    BaseEntity
} from 'typeorm';
import base32Encode from 'base32-encode';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Thread } from './Thread';

// NOTE: This was chosed based on a stack overflow post. Probably should do more
// research if you ever deploy this for real.
const SALT_ROUNDS = 10;
const JWT_SECRET = 'pls_use_a_real_secret';

enum JWTType {
    Full = 'FULL',
    TOTP = 'TOTP'
}

type JWT = {
    userID: number;
    type: JWTType;
};

@Entity()
export class User extends BaseEntity {
    static async fromToken(token: string): Promise<User | undefined> {
        const data = jwt.verify(token, JWT_SECRET) as JWT;
        if (data.type !== JWTType.Full) {
            return;
        }
        return await this.findOne(data.userID);
    }

    static async fromTOTPToken(totpToken: string, token: string): Promise<User | undefined> {
        const data = jwt.verify(totpToken, JWT_SECRET) as JWT;
        if (data.type !== JWTType.TOTP) {
            return;
        }
        const user = await this.findOne(data.userID);
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

    generateTotpSecret() {
        return otplib.authenticator.generateSecret();
    }

    async checkPassword(password: string) {
        return await bcrypt.compare(password, this.passwordHash);
    }

    token() {
        const payload: JWT = { userID: this.id, type: JWTType.Full };
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '10 days' });
    }

    totpToken() {
        const payload: JWT = { userID: this.id, type: JWTType.TOTP };
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '5 minutes' });
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
