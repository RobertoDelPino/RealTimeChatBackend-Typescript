import { User } from "../../../src/Users/Domain/entities/User";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { mongoDbUserRepository as UserRepository } from "../../../src/Users/Infraestructure/Repositories/MongoDB/userRepository";

describe("LoginUseCase", () => {

    let userRepository : IUserRepository;
    let loginUseCase : LoginUseCase;

    beforeEach(() => {
        userRepository = new UserRepository();
        loginUseCase = new LoginUseCase(userRepository);
    })

    test("should login user", async () => {
        userRepository.findByUsername = jest.fn().mockReturnValue({
            id: "id",
            name: "name",
            email: "email",
            avatar: "avatar",
            token: "token"
        });

        const request : LoginData = {
            email: "username",
            password: "password"
        }

        const result = await loginUseCase.execute(request);

        expect(result).not.toBeNull();
        expect(userRepository.findByUsername).toHaveBeenCalledWith("username");
    });

    test("throws error when user not found", async () => {
        userRepository.findByUsername = jest.fn().mockReturnValue(null);

        const request : LoginData = {
            email: "username",
            password: "password"
        }

        const useCasePromise = loginUseCase.execute(request);

        await expect(useCasePromise).rejects.toThrowError("User not found");
    });
})

class LoginUseCase {
    constructor(private userRepository: IUserRepository) {
    }

    async execute(request: LoginData): Promise<User> {
        const user: User | null = await this.userRepository.findByUsername(request.email);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }
}

export interface LoginData{
    email: string;
    password: string;
}