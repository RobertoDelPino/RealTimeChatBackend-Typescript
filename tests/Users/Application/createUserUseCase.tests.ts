import { ICreateToken } from "../../../src/Users/Domain/interfaces/createToken";
import { IEmailSender } from "../../../src/Users/Domain/interfaces/emailSender";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { userRepositoryMock } from "../Domain/Mocks/userRepository";
import { createTokenMock } from "../Domain/Mocks/createToken";
import { emailSenderMock } from "../Domain/Mocks/emailSender";
import { CreateUserUseCase, ICreateUserUseCase, UserData } from "../../../src/Users/Application/createUserUseCase";

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
});