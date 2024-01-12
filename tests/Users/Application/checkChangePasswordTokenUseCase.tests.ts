import { ICheckChangePasswordTokenUseCase, CheckChangePasswordTokenUseCase } from "../../../src/Users/Application/checkChangePasswordTokenUseCase";
import { User } from "../../../src/Users/Domain/entities/User";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { userRepositoryMock } from "../Domain/Mocks/userRepository";

describe("Check Change Password Token Use Case Tests", () => {

    let userRepository : IUserRepository;
    let checkChangePasswordTokenUseCase : ICheckChangePasswordTokenUseCase;

    beforeEach(() => {
        userRepository = userRepositoryMock;
        checkChangePasswordTokenUseCase = new CheckChangePasswordTokenUseCase(userRepository);
    })

    it("checks change password token", async () => {
        const changePasswordToken = "token";
        const user = createUser(changePasswordToken);
        userRepository.findByChangePasswordToken = jest.fn().mockReturnValue(user);

        await checkChangePasswordTokenUseCase.execute(changePasswordToken);

        expect(userRepository.findByChangePasswordToken).toBeCalledWith(changePasswordToken);
        expect(userRepository.findByChangePasswordToken).toReturnWith(user);
    });

    it("throws error if user not found", async () => {
        userRepository.findByChangePasswordToken = jest.fn().mockReturnValue(null);

        await expect(checkChangePasswordTokenUseCase.execute("token")).rejects.toThrowError("User not found");
    });
});

function createUser(confirmAccountToken: string) : User {
    return new User(
        UserId.createFromBussiness("id"),
        UserName.createFromBussiness("name"),
        UserEmail.createFromBussiness("email"),
        Password.createFromBussiness("password"),
        Token.createFromBussiness(confirmAccountToken),
        Token.createFromBussiness("token"),
        true,
        Avatar.createFromBussiness("avatar")
    );
}