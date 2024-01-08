import { Either, left, right } from 'fp-ts/lib/Either';

export class UserName {
    public readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static create(value: string): Either<string, UserName> {
        if (typeof value !== 'string' || value.trim() === '') {
            return left('Invalid value for UserName');
        }
        
        return right(new UserName(value));
    }

    static createFromBussiness(value: string): UserName {
        return new UserName(value);
    }
}
