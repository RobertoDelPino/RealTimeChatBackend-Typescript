import { User } from "../../../src/Users/Domain/entities/User";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { mongoDbUserRepository as UserRepository } from "../../../src/Users/Infraestructure/Repositories/MongoDB/userRepository";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";
import { 
    ILoginUseCase, 
    LoginData, 
    LoginUseCase 
} from "../../../src/Users/Application/LoginUseCase";

describe("LoginUseCase", () => {

    let userRepository : IUserRepository;
    let loginUseCase : ILoginUseCase;

    beforeEach(() => {
        userRepository = new UserRepository();
        loginUseCase = new LoginUseCase(userRepository);
    })

    test("should login user", async () => {
        userRepository.findByUsername = jest.fn().mockReturnValue(createUser());
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
        userRepository.findByUsername = jest.fn().mockReturnValue(createUser());
        const request : LoginData = {
            email: "username",
            password: "invented_password"
        }

        const useCasePromise = loginUseCase.execute(request);

        await expect(useCasePromise).rejects.toThrowError("Password is incorrect");
    });

    test("throws error when password is invalid", async () => {
        userRepository.findByUsername = jest.fn().mockReturnValue(createUser());
        const request : LoginData = {
            email: "username",
            password: "pass"
        }

        const useCasePromise = loginUseCase.execute(request);

        await expect(useCasePromise).rejects.toThrowError("Password must be at least 8 characters long");
    });
})

function createUser(): User {
    return new User(
        UserId.createFromBussiness("id"),
        UserName.createFromBussiness("name"),
        UserEmail.createFromBussiness("email"),
        Password.createFromBussiness("password"),
        Token.createFromBussiness("token"),
        Token.createFromBussiness("token"),
        false,
        Avatar.createFromBussiness("avatar")
    );
}