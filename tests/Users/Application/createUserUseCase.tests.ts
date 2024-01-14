import { ICreateToken } from "../../../src/Users/Domain/interfaces/createToken";
import { IEmailSender } from "../../../src/Users/Domain/interfaces/emailSender";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { userRepositoryMock } from "../Domain/Mocks/userRepository";
import { createTokenMock } from "../Domain/Mocks/createToken";
import { emailSenderMock } from "../Domain/Mocks/emailSender";
import { CreateUserUseCase, ICreateUserUseCase, UserData } from "../../../src/Users/Application/createUserUseCase";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";
import { User } from "../../../src/Users/Domain/entities/User";

describe("createUserUseCase", () => {

    let userRepository: IUserRepository;
    let createToken: ICreateToken;
    let emailSender: IEmailSender;
    let useCase : ICreateUserUseCase;

    beforeEach(() => {
    
        userRepository = userRepositoryMock;
        createToken = createTokenMock;
        emailSender = emailSenderMock;
        useCase = new CreateUserUseCase(userRepository, createToken, emailSender);
    });

    it("creates a user", async () => {
        const userData : UserData = {
            email: 'roberto@gmail.com',
            password: 'password',
            name: "roberto"
        }

        userRepository.findByEmail = jest.fn().mockReturnValue(null);

        const user = await useCase.execute(userData);

        expect(userRepository.save).toBeCalledWith(user);
        expect(emailSender.sendEmailToConfirmAccount).toBeCalledWith(user.email, user.confirmAccountToken);
    });

    it("throws an error if the user already exists", async () => {
        const userData : UserData = {
            email: 'roberto@gmail.com',
            password: 'password',
            name: "roberto"
        }

        userRepository.findByEmail = jest.fn().mockReturnValue(createUser());

        const useCasePromise = useCase.execute(userData);

        await expect(useCasePromise).rejects.toThrow('User already exists');
    });

    it("throws an error when password creation fail", async () => {
        const userData : UserData = {
            email: 'roberto@gmail.com',
            password: 'pass',
            name: "Roberto"
        }

        userRepository.findByEmail = jest.fn().mockReturnValue(null);

        const useCasePromise = useCase.execute(userData);

        expect(useCasePromise).rejects.toThrow('Error: Password must be at least 8 characters long');
    });
});

function createUser() : User {
    return new User(
        UserId.createFromBussiness("id"),
        UserName.createFromBussiness("name"),
        UserEmail.createFromBussiness("email"),
        Password.createFromBussiness("password"),
        Token.createFromBussiness("token"),
        Token.createFromBussiness("token"),
        true,
        Avatar.createFromBussiness("avatar")
    );
}