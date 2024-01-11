import { Either, fold } from "fp-ts/lib/Either";
import { User } from "../Domain/entities/User";
import { ICreateToken } from "../Domain/interfaces/createToken";
import { IUserRepository } from "../Domain/interfaces/userRepository";
import { Password } from "../Domain/valueObjects/Password";
import hashString from "../Domain/services/hashString";
import { checkPassword } from "../Domain/services/checkPassword";

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

        const hashValue = await hashString(newPassword);
        let passwordToCheck : Password = this.createPassword(hashValue);

        if(!await checkPassword(passwordToCheck, user.password)){
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

    private createPassword(newPassword: string): Password {
        let errors: string[] = [];
       
        let password: Password;
       
        const passwordResult = Password.create(newPassword);
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
