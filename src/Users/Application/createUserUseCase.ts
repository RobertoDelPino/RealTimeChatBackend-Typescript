import { IUserRepository } from '../Domain/interfaces/userRepository';
import { User } from '../Domain/entities/User';
import { UserName } from '../Domain/valueObjects/UserName';
import { Either, fold } from 'fp-ts/lib/Either';
import { UserEmail } from '../Domain/valueObjects/UserEmail';
import { Password } from '../Domain/valueObjects/Password';
import { UserId } from '../Domain/valueObjects/UserId';
import { ICreateToken } from '../Domain/interfaces/createToken';
import { IEmailSender } from '../Domain/interfaces/emailSender';

export class CreateUserUseCase {

    constructor(
        private userRepository: IUserRepository,
        private createToken: ICreateToken,
        private emailSender: IEmailSender
    ) {}

    async execute(userData: UserData): Promise<User> {
        try{
            const userExists = await this.userRepository.findByEmail(userData.email);
            if(userExists) {
                throw new Error('User already exists');
            }

            const user: User = this.createUser(userData);
            await this.userRepository.save(user);
            this.emailSender.sendEmailToConfirmAccount(user.email, user.confirmAccountToken);

            return user;
        }
        catch(error: any) {
            throw new Error(error);
        }
    }

    private createUser(userData: UserData): User {
        let errors: string[] = [];

        let userId: UserId;
        let name: UserName;
        let email: UserEmail;
        let password: Password;
        const confirmAccountTokenResult = this.createToken.createToken();
        const changePasswordToken = this.createToken.createEmptyToken(); 

        const idResult = this.createRandomId();
        const nameResult = UserName.create(userData.name);
        const emailResult = UserEmail.create(userData.email);
        const passwordResult = Password.create(userData.password);
        this.handleValueObject(idResult, (value: UserId) => userId = value, (error: string) => errors.push(error));
        this.handleValueObject(nameResult, (value: UserName) => name = value, (error: string) => errors.push(error));
        this.handleValueObject(emailResult, (value: UserEmail) => email = value, (error: string) => errors.push(error));
        this.handleValueObject(passwordResult, (value: Password) => password = value, (error: string) => errors.push(error));

        if(errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        return new User(userId!, name!, email!, password!, confirmAccountTokenResult, changePasswordToken, false);
    }

    private createRandomId(): Either<string, UserId> {
        const randomId = Math.floor(Math.random() * 1000);
        return UserId.create(randomId.toString());
    }

    handleValueObject<T>(result: Either<string, T>, setValue: (value: T) => void, setError: (value: string) => void): void {
        const getValue = fold(
          (error: string) => setError(error),
          (value: T) => setValue(value)
        );
      
        getValue(result);
    }
}

export interface UserData {
    name: string;
    email: string;
    password: string;
} 
