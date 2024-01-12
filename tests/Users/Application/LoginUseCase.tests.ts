import { User } from "../../../src/Users/Domain/entities/User";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
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
import { ICreateJWT } from "../../../src/Users/Domain/interfaces/createJWT";
import { userRepositoryMock } from "../Domain/Mocks/userRepository";
import { createJWTMock } from "../Domain/Mocks/createJWT";

describe("LoginUseCase", () => {
    let userRepository : IUserRepository;
    let createJWT: ICreateJWT;
    let loginUseCase : ILoginUseCase;

    beforeEach(() => {
        userRepository = userRepositoryMock;
        createJWT = createJWTMock;
        loginUseCase = new LoginUseCase(userRepository, createJWT);
    })

    test("should login user", async () => {
        userRepository.findByEmail = jest.fn().mockReturnValue(createUser());
        const request : LoginData = {
            email: "email@gmail.com",
            password: "password"
        }

        const result = await loginUseCase.execute(request);

        expect(result).not.toBeNull();
        expect(userRepository.findByEmail).toHaveBeenCalledWith("email@gmail.com");
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("email");
        expect(result).toHaveProperty("token");
    });

    test("throws error when user not found", async () => {
        userRepository.findByEmail = jest.fn().mockReturnValue(null);
        const request : LoginData = {
            email: "email@gmail.com",
            password: "password"
        }

        const useCasePromise = loginUseCase.execute(request);

        await expect(useCasePromise).rejects.toThrowError("User not found");
    });

    test("throws error when password is incorrect", async () => {
        userRepository.findByEmail = jest.fn().mockReturnValue(createUser());
        const request : LoginData = {
            email: "username",
            password: "invented_password"
        }

        const useCasePromise = loginUseCase.execute(request);

        await expect(useCasePromise).rejects.toThrowError("Password is incorrect");
    });

    test("throws error when password is invalid", async () => {
        userRepository.findByEmail = jest.fn().mockReturnValue(createUser());
        const request : LoginData = {
            email: "email@gmail.com",
            password: "pass"
        }

        const useCasePromise = loginUseCase.execute(request);

        await expect(useCasePromise).rejects.toThrowError("Password must be at least 8 characters long");
    });
})

function createUser(): User {
    const passwordHash = "$2a$10$jq4GYds0tu4Mbvxt7mb6Se.8.raBts1FsnafM7h5ljnBfMS4DEz1G"

    return new User(
        UserId.createFromBussiness("id"),
        UserName.createFromBussiness("name"),
        UserEmail.createFromBussiness("email"),
        Password.createFromBussiness(passwordHash),
        Token.createFromBussiness("token"),
        Token.createFromBussiness("token"),
        false,
        Avatar.createFromBussiness("avatar")
    );
}