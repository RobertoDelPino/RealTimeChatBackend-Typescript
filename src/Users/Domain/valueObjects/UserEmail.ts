import { Either, left, right } from 'fp-ts/lib/Either';

export class UserEmail {
    public readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static create(value: string): Either<string, UserEmail> {
        if (typeof value !== 'string' || value.trim() === '') {
            return left('Invalid value for Email');
        }
        
        return right(new UserEmail(value));
    }

    static createFromBussiness(value: string): UserEmail {
        return new UserEmail(value);
    }
}
