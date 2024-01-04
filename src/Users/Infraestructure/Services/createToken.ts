import { Either, fold } from "fp-ts/lib/Either";
import { ICreateToken } from "../../Domain/interfaces/createToken";
import { Token } from "../../Domain/valueObjects/Token";

export class createToken implements ICreateToken {
    createToken(): Token {
        let errors: string[] = [];
        let randomToken: Token;

        const random = Math.floor(Math.random() * 1000);
        const tokenResult = Token.create(random.toString());
        this.handleValueObject(tokenResult, (value: Token) => randomToken = value, (error: string) => errors.push(error));
        return randomToken!;
    }

    createEmptyToken(): Token {
        let errors: string[] = [];
        let randomToken: Token;

        const tokenResult = Token.create("");
        this.handleValueObject(tokenResult, (value: Token) => randomToken = value, (error: string) => errors.push(error));
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