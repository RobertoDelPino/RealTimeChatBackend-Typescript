import { Either, left, right } from 'fp-ts/lib/Either';
import bcrypt from "bcrypt";

export class Password {
    public readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static async create(value: string): Promise<Either<string, Password>> {
        if (typeof value !== 'string' || value.trim() === '') {
            return left('Invalid value for Password');
        }

        if(value.length < 8) {
            return left('Password must be at least 8 characters long');
        }
        
        const salt = await bcrypt.genSalt(10);
        const passwordString = await bcrypt.hash(value, salt);
        return right(new Password(passwordString));
    }

    static createFromBussiness(value: string): Password {
        return new Password(value);
    }

    public equals(password: Password): boolean {
        return this.value === password.value;
    }
}
