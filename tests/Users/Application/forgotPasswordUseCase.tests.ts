import { ForgotPasswordUseCase, IForgotPasswordUseCase } from "../../../src/Users/Application/forgotPasswordUseCase";
import { User } from "../../../src/Users/Domain/entities/User";
import { ICreateToken } from "../../../src/Users/Domain/interfaces/createToken";
import { IEmailSender } from "../../../src/Users/Domain/interfaces/emailSender";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { emailSenderMock } from "../Domain/Mocks/emailSender";
import { createTokenMock } from "../Domain/Mocks/createToken";
import { userRepositoryMock } from "../Domain/Mocks/userRepository";

describe("Forgot Password Use Case Tests", () => {

    let userRepository : IUserRepository;
    let emailSender : IEmailSender;
    let createToken : ICreateToken;
    let forgotPasswordUseCase : IForgotPasswordUseCase;

    beforeEach(() => {
        userRepository = userRepositoryMock;
        emailSender = emailSenderMock;
        createToken = createTokenMock;

        forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository, emailSender, createToken);
    })

    test("sends email to user with new password change token", async () => {
        const email = "roberto@gmail.com";
        userRepository.findByEmail = jest.fn().mockReturnValue(createUser(email));

        createToken.createToken = jest.fn().mockReturnValue(Token.createFromBussiness("token"));

        await forgotPasswordUseCase.execute(email);

        expect(userRepository.findByEmail).toBeCalledWith(email);
        expect(userRepository.update).toBeCalled();
        expect(emailSender.sendForgotPasswordEmail).toBeCalled();
    });

    test("throws error when user not found", async () => {
        userRepository.findByEmail = jest.fn().mockReturnValue(null);

        const useCasePromise = forgotPasswordUseCase.execute("notfound@email.com");

        await expect(useCasePromise).rejects.toThrowError("User not found");
    });

    test("throws error when user email is empty", async () => {
        const useCasePromise = forgotPasswordUseCase.execute("");

        await expect(useCasePromise).rejects.toThrowError("User email is required");
    });
});


function createUser(email: string) : User {
    return new User(
        UserId.createFromBussiness("id"),
        UserName.createFromBussiness("name"),
        UserEmail.createFromBussiness(email),
        Password.createFromBussiness("password"),
        Token.createFromBussiness("token"),
        Token.createFromBussiness("token"),
        true,
        Avatar.createFromBussiness("avatar")
    );
}