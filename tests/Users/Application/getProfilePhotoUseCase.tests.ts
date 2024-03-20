import { User } from "../../../src/Users/Domain/entities/User";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { userRepositoryMock } from "../Domain/Mocks/userRepository";
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";
import { GetProfilePhotoUseCase, IGetProfilePhotoUseCase } from "../../../src/Users/Application/getProfilePhotoUseCase";
import path from "path"

describe("Get Profile Photo Use Case Tests", () => {
    
    let userRepository : IUserRepository;
    let getProfilePhotoUseCase : IGetProfilePhotoUseCase;

    beforeEach(() => {
        userRepository = userRepositoryMock;
        getProfilePhotoUseCase = new GetProfilePhotoUseCase(userRepository);
    })

    test("Should return the default avatar", async () => {

        userRepository.findById = jest.fn().mockReturnValue(createUser());

        const userAvatar = await getProfilePhotoUseCase.execute("1");

        expect(userAvatar).toBe(path.resolve("src/UserPhotos/defaultAvatar.webp"));
    });
    
    test("Should return the user avatar", async () => {
        userRepository.findById = jest.fn().mockReturnValue(createUser());

        const userAvatar = await getProfilePhotoUseCase.execute("1");

        expect(userAvatar).toBe(path.resolve("src/UserPhotos/defaultAvatar.webp"));
    });

    test("Should throw an error when the user is not found", async () => {
        userRepository.findById = jest.fn().mockReturnValue(null);

        const getProfilePhotoPromise = getProfilePhotoUseCase.execute("1");

        await expect(getProfilePhotoPromise).rejects.toThrow("User not found");
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
        Avatar.createFromBussiness("src/UserPhotos/defaultAvatar.webp")
    );
}