import { IChangePasswordUseCase, changePasswordUseCase } from "../../../src/Users/Application/changePasswordUseCase";
import { ICreateToken } from "../../../src/Users/Domain/interfaces/createToken";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { userRepositoryMock } from "../Domain/Mocks/userRepository"
import { createTokenMock } from "../Domain/Mocks/createToken";
import { User } from "../../../src/Users/Domain/entities/User";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";
import hashString from "../../../src/Users/Domain/services/hashString";

describe('ChangePasswordUseCase', () => {
    let userRepository: IUserRepository;
    let createToken : ICreateToken;
    let useCase: IChangePasswordUseCase;

    beforeEach(() => {
        userRepository = userRepositoryMock;
        createToken = createTokenMock;
        useCase = new changePasswordUseCase(userRepository, createToken);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should change the password', async () => {
        const passwordToken = "token";
        const oldPassword = "oldPassword";
        const oldPasswordHash = await hashString(oldPassword);
        const newPassword = "newPassword";
        userRepository.findByChangePasswordToken = jest.fn().mockReturnValue(createUser(passwordToken, oldPasswordHash))

        await useCase.execute(passwordToken, newPassword);

        expect(userRepository.findByChangePasswordToken).toBeCalledWith(passwordToken);
        expect(userRepository.update).toBeCalled();
    });

    it('should throw an error if the user is not found', async () => {
        userRepository.findByChangePasswordToken = jest.fn().mockReturnValue(null)

        const useCasePromise = useCase.execute("", "")

        await expect(useCasePromise).rejects.toThrow('User not found');
        expect(userRepository.findByChangePasswordToken).toBeCalled();
        expect(userRepository.update).not.toBeCalled();
    });

});

function createUser(changePasswordToken: string, password: string) : User {
    return new User(
        UserId.createFromBussiness("id"),
        UserName.createFromBussiness("name"),
        UserEmail.createFromBussiness("email"),
        Password.createFromBussiness(password),
        Token.createFromBussiness("token"),
        Token.createFromBussiness(changePasswordToken),
        true,
        Avatar.createFromBussiness("avatar")
    );
}