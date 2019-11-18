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

@Entity()
export class User extends BaseEntity {
    static async fromToken(token: string): Promise<User | undefined> {
        const data = jwt.verify(token, JWT_SECRET) as Record<string, any>;
        return await this.findOne(data.userID);
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
        return jwt.sign({ userID: this.id }, JWT_SECRET, { expiresIn: '10 days' });
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
