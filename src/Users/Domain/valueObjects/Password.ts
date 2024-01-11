import { Either, left, right } from 'fp-ts/lib/Either';


export class Password {
    public readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static create(value: string): Either<string, Password> {
        if (typeof value !== 'string' || value.trim() === '') {
            return left('Invalid value for Password');
        }

        if(value.length < 8) {
            return left('Password must be at least 8 characters long');
        }
        
        return right(new Password(value));
    }

    static createFromBussiness(value: string): Password {
        return new Password(value);
    }

    public equals(password: Password): boolean {
        return this.value === password.value;
    }
}
