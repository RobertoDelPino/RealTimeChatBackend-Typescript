import { Either, left, right } from 'fp-ts/lib/Either';

export class Avatar {
    public readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static create(value: string): Either<string, Avatar> {
        if (typeof value !== 'string' || value.trim() === '') {
            return left('Invalid value for Avatar');
        }
        
        return right(new Avatar(value));
    }
}
