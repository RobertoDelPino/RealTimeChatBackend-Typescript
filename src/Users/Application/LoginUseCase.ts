import { Either, fold } from "fp-ts/lib/Either";
import { User } from "../Domain/entities/User";
import { IUserRepository } from "../Domain/interfaces/userRepository";
import { Password } from "../Domain/valueObjects/Password";

export interface ILoginUseCase {
    execute(request: LoginData): Promise<LoginResponse>;
}

export class LoginUseCase {
    constructor(private userRepository: IUserRepository) {
    }

    async execute(request: LoginData): Promise<LoginResponse> {
        const password = this.createPassword(request.password);

        const user: User | null = await this.userRepository.findByUsername(request.email);

        if (!user) {
            throw new Error('User not found');
        }

        if (!user.checkPasswordEquals(password)) {
            throw new Error('Password is incorrect');
        }

        return user;
    }

    private createPassword(passwordRequest: string): Password {
        let password: Password;
        let errors: string[] = [];
        
        const passwordResult =  Password.create(passwordRequest);
        this.handleValueObject(passwordResult, (value: Password) => password = value, (error: string) => errors.push(error));
        
        if(errors.length > 0){
            throw new Error(errors.join(', '));
        }

        return password!;
    }

    handleValueObject<T>(result: Either<string, T>, setValue: (value: T) => void, setError: (value: string) => void): void {
        const getValue = fold(
          (error: string) => setError(error),
          (value: T) => setValue(value)
        );
      
        getValue(result);
    }
}


export interface LoginData{
    email: string;
    password: string;
}

export interface LoginResponse{
    name: string;
    email: string;
    token: string;
}