import { Either, fold } from "fp-ts/lib/Either";
import { ICreateToken } from "../interfaces/createToken";
import { Token } from "../valueObjects/Token";

export class createToken implements ICreateToken {
    createToken(): Token {
        let errors: string[] = [];
        let randomToken: Token;

        const random = Math.random().toString(32).substring(2).toString();
        const date = Date.now().toString(32);
        const tokenResult = Token.create(random + date);
        this.handleValueObject(tokenResult, (value: Token) => randomToken = value, (error: string) => errors.push(error));
        return randomToken!;
    }

    createEmptyToken(): Token {
        let randomToken: Token;

        const tokenResult = Token.create("");
        this.handleValueObject(tokenResult, (value: Token) => randomToken = value, () => {});
        return randomToken!;
    }

    handleValueObject<T>(result: Either<string, T>, setValue: (value: T) => void, setError: (value: string) => void): void {
        const getValue = fold(
          (error: string) => setError(error),
          (value: T) => setValue(value)
        );
      
        getValue(result);
    }
}