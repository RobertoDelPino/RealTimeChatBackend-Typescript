import { User } from "../../../src/Users/Domain/entities/User";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { userRepositoryMock } from "../Domain/Mocks/userRepository";
import fs from "fs"
import path from "path"
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";

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

        expect(userAvatar).toBe(path.resolve("UserPhotos/defaultAvatar.jpg"));
    });
    
    test("Should return the user avatar", async () => {
        userRepository.findById = jest.fn().mockReturnValue(createUser());

        const userAvatar = await getProfilePhotoUseCase.execute("1");

        expect(userAvatar).toBe(path.resolve("UserPhotos/defaultAvatar.jpg"));
    });

});

export interface IGetProfilePhotoUseCase {
    execute(userId: string): Promise<string>;
}

export class GetProfilePhotoUseCase implements IGetProfilePhotoUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: string): Promise<string> {
        try{
            const defaultAvatar = path.resolve("UserPhotos/defaultAvatar.jpg");

            const user: User | null = await this.userRepository.findById(userId);
            if (!user) throw new Error("User not found");

            if(user.avatar.value === "UserPhotos/defaultAvatar.jpg"){
                return path.resolve("UserPhotos/defaultAvatar.jpg");
            }

            const userAvatar = path.resolve(user.avatar.value.replace("\\", "/"));
            if(!userAvatar){
                return defaultAvatar;
            }
            return defaultAvatar;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

function createUser() : User {
    return new User(
        UserId.createFromBussiness("id"),
        UserName.createFromBussiness("name"),
        UserEmail.createFromBussiness("email"),
        Password.createFromBussiness("password"),
        Token.createFromBussiness("token"),
        Token.createFromBussiness("token"),
        true,
        Avatar.createFromBussiness("UserPhotos/defaultAvatar.jpg")
    );
}