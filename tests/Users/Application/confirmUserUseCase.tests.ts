import { ConfirmUserUseCase, IConfirmUserUseCase } from "../../../src/Users/Application/confirmUserUseCase";
import { User } from "../../../src/Users/Domain/entities/User";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { userRepositoryMock } from "../Domain/Mocks/userRepository";

describe("Confirm User Use Case Tests", () => {
    let userRepository : IUserRepository;
    let confirmUserUseCase : IConfirmUserUseCase;

    beforeEach(() => {
        userRepository = userRepositoryMock;
        confirmUserUseCase = new ConfirmUserUseCase(userRepository);
    })

    it("confirms user account", async () => {
        const confirmAccountToken = "token";
        const confirmed = false;
        userRepository.findByConfirmAccountToken = jest.fn().mockReturnValue(createUser(confirmAccountToken, confirmed));

        await confirmUserUseCase.execute(confirmAccountToken);

        expect(userRepository.findByConfirmAccountToken).toBeCalledWith(confirmAccountToken);
        expect(userRepository.update).toBeCalled();
    });

    it("throws error when user not found", async () => {
        userRepository.findByConfirmAccountToken = jest.fn().mockReturnValue(null);

        const useCasePromise = confirmUserUseCase.execute("");

        await expect(useCasePromise).rejects.toThrowError("User not found");
    });

    it("throws error when user is already confirmed", async () => {
        const confirmAccountToken = "token";
        userRepository.findByConfirmAccountToken = jest.fn().mockReturnValue(createUser(confirmAccountToken, true));

        const useCasePromise = confirmUserUseCase.execute(confirmAccountToken);

        await expect(useCasePromise).rejects.toThrowError("User is already confirmed");
    });
});


function createUser(confirmAccountToken: string, confirmed: boolean) : User {
    return new User(
        UserId.createFromBussiness("id"),
        UserName.createFromBussiness("name"),
        UserEmail.createFromBussiness("email"),
        Password.createFromBussiness("password"),
        Token.createFromBussiness(confirmAccountToken),
        Token.createFromBussiness("token"),
        confirmed,
        Avatar.createFromBussiness("avatar")
    );
}