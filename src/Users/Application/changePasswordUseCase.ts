import { Either, fold } from "fp-ts/lib/Either";
import { User } from "../Domain/entities/User";
import { ICreateToken } from "../Domain/interfaces/createToken";
import { IUserRepository } from "../Domain/interfaces/userRepository";
import { Password } from "../Domain/valueObjects/Password";

export interface IChangePasswordUseCase {
    execute(changePasswordToken: string, newPassword: string): Promise<void>;
}

export class changePasswordUseCase implements IChangePasswordUseCase {
    constructor(
        private userRepository: IUserRepository,
        private createToken: ICreateToken,
    ) {}

    async execute(changePasswordToken: string, newPassword: string): Promise<void> {
        const user : User | null = await this.userRepository.findByChangePasswordToken(changePasswordToken);
        if (!user) {
            throw new Error('User not found');
        }

        let passwordToCheck : Password = await this.createPassword(newPassword);

        if(user.checkPasswordEquals(passwordToCheck)){
            throw new Error('New password must be different from the old one');
        }

        user.update(new User(
            user.id,
            user.name,
            user.email,
            passwordToCheck,
            this.createToken.createEmptyToken(),
            user.confirmAccountToken,
            user.confirmed,
            user.avatar
        ));

        await this.userRepository.update(user);
    }

    private async createPassword(newPassword: string): Promise<Password> {
        let errors: string[] = [];
       
        let password: Password;
       
        const passwordResult = await Password.create(newPassword);
        this.handleValueObject(passwordResult, (value: Password) => password = value, (error: string) => errors.push(error));

        if(errors.length > 0) {
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
