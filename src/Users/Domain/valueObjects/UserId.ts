import { Either, left, right } from 'fp-ts/lib/Either';

export class UserId {
    public readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static create(value: string): Either<string, UserId> {
        if (typeof value !== 'string' || value.trim() === '') {
            return left('Invalid value for UserId');
        }
        
        return right(new UserId(value));
    }
}
