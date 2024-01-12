import { GetProfileUseCase, IGetProfileUseCase } from "../../../src/Users/Application/getProfileUseCase";
import { User } from "../../../src/Users/Domain/entities/User";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { mongoDbUserRepository as UserRepository } from "../../../src/Users/Infraestructure/Repositories/MongoDB/userRepository";

describe("Get Profile Use Case Tests", () => {
    let userRepository : IUserRepository;
    let getProfileUseCase : IGetProfileUseCase;

    beforeEach(() => {
        userRepository = new UserRepository();
        getProfileUseCase = new GetProfileUseCase(userRepository);
    })

    test("gets user profile", async () => {
        const email = "roberto@gmail.com";
        userRepository.findByEmail = jest.fn().mockReturnValue(createUser(email));

        const result = await getProfileUseCase.execute(email);

        expect(result).not.toBeNull();
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("email");
        expect(result).toHaveProperty("avatar");
    });
    
    test("throws error when user not found", async () => {
        userRepository.findByEmail = jest.fn().mockReturnValue(null);

        const useCasePromise = getProfileUseCase.execute("");

        await expect(useCasePromise).rejects.toThrowError("User not found");
    })
})

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