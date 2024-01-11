import { Either, fold } from "fp-ts/lib/Either";
import { User } from "../../../src/Users/Domain/entities/User";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { mongoDbUserRepository as UserRepository } from "../../../src/Users/Infraestructure/Repositories/MongoDB/userRepository";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";

describe("LoginUseCase", () => {

    let userRepository : IUserRepository;
    let loginUseCase : LoginUseCase;

    beforeEach(() => {
        userRepository = new UserRepository();
        loginUseCase = new LoginUseCase(userRepository);
    })

    test("should login user", async () => {
        userRepository.findByUsername = jest.fn().mockReturnValue({
            id: "id",
            name: "name",
            email: "email",
            avatar: "avatar",
            token: "token"
        });

        const request : LoginData = {
            email: "username",
            password: "password"
        }

        const result = await loginUseCase.execute(request);

        expect(result).not.toBeNull();
        expect(userRepository.findByUsername).toHaveBeenCalledWith("username");
    });

    test("throws error when user not found", async () => {
        userRepository.findByUsername = jest.fn().mockReturnValue(null);

        const request : LoginData = {
            email: "username",
            password: "password"
        }

        const useCasePromise = loginUseCase.execute(request);

        await expect(useCasePromise).rejects.toThrowError("User not found");
    });

    test("throws error when password is incorrect", async () => {
        userRepository.findByUsername = jest.fn().mockReturnValue(
            new User(
                UserId.createFromBussiness("id"),
                UserName.createFromBussiness("name"),
                UserEmail.createFromBussiness("email"),
                Password.createFromBussiness("password"),
                Token.createFromBussiness("token"),
                Token.createFromBussiness("token"),
                false,
                Avatar.createFromBussiness("avatar")
            )
        );

        const request : LoginData = {
            email: "username",
            password: "invented_password"
        }

        const useCasePromise = loginUseCase.execute(request);

        await expect(useCasePromise).rejects.toThrowError("Password is incorrect");
    });
})

class LoginUseCase {
    constructor(private userRepository: IUserRepository) {
    }

    async execute(request: LoginData): Promise<User> {
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