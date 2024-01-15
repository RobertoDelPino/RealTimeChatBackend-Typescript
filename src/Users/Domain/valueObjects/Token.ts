import { Either, left, right } from 'fp-ts/lib/Either';

export class Token {
    public readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static create(value: any): Either<string, Token> {
        if (typeof value !== 'string') {
            return left('Invalid value for Token');
        }
        
        return right(new Token(value));
    }

    static createFromBussiness(value: string): Token {
        return new Token(value);
    }
}
