import { IUserRepository } from '../Domain/interfaces/userRepository';
import { User } from '../Domain/entities/User';
import { UserName } from '../Domain/valueObjects/UserName';
import { Either, fold } from 'fp-ts/lib/Either';
import { UserEmail } from '../Domain/valueObjects/UserEmail';
import { Password } from '../Domain/valueObjects/Password';
import { UserId } from '../Domain/valueObjects/UserId';

export class CreateUserUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute(userData: UserData): Promise<User> {
        try{
            const user: User = this.createUser(userData);

            // Save the user to the repository
            await this.userRepository.save(user);

            return user;
        }
        catch(error: any) {
            throw new Error(error);
        }
    }

    private createUser(userData: UserData): User {
        // using value objects to validate the data
        let errors: string[] = [];

        let userId: UserId;
        let name: UserName;
        let email: UserEmail;
        let password: Password;

        const userIdResult = UserId.create(userData.id);
        const nameResult = UserName.create(userData.name);
        const emailResult = UserEmail.create(userData.email);
        const passwordResult = Password.create(userData.password);
        this.handleValueObject(userIdResult, (value: UserId) => userId = value, (error: string) => errors.push(error));
        this.handleValueObject(nameResult, (value: UserName) => name = value, (error: string) => errors.push(error));
        this.handleValueObject(emailResult, (value: UserEmail) => email = value, (error: string) => errors.push(error));
        this.handleValueObject(passwordResult, (value: Password) => password = value, (error: string) => errors.push(error));

        if(errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        const createdUser = new User(userId!.value, name!.value, email!.value, password!.value);

        return createdUser;
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
    id: string;
    name: string;
    email: string;
    password: string;
} 
