import { IUpdateUserProfileUseCase, IUpdateUserProfileUseCaseProps, UpdateUserProfileUseCase } from "../../../src/Users/Application/updateUserProfileUseCase";
import { IUserRepository  } from "../../../src/Users/Domain/interfaces/userRepository";
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { userRepositoryMock  } from "../Domain/Mocks/userRepository";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";
import { User } from "../../../src/Users/Domain/entities/User";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";

describe("Update User Profile Use Case", () => {

    let updateUserProfileUseCase: IUpdateUserProfileUseCase;
    let userRepository: IUserRepository;

    beforeAll(() => {
        userRepository = userRepositoryMock;
        updateUserProfileUseCase = new UpdateUserProfileUseCase(userRepository);
    });

    it("Updates user profile", async () => {
        const request: IUpdateUserProfileUseCaseProps = {
            id: "1",
            name: "John Doe",
            password: "password",
            avatar: "avatar"
        };
        userRepository.findById = jest.fn().mockResolvedValue(createUser())

        await updateUserProfileUseCase.execute(request);

        expect(userRepository.findById).toHaveBeenCalledWith(request.id);
        expect(userRepository.save).toHaveBeenCalled();
    });

    it("throws an error if the user does not exist", async () => {
        const request: IUpdateUserProfileUseCaseProps = {
            id: "1",
            name: "John Doe",
            password: "password",
            avatar: "avatar"
        };
        userRepository.findById = jest.fn().mockResolvedValue(null);

        const useCasePromise = updateUserProfileUseCase.execute(request);

        await expect(useCasePromise).rejects.toThrow('User not found');
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

