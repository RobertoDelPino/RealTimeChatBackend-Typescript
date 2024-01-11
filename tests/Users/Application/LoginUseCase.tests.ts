import { User } from "../../../src/Users/Domain/entities/User";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { mongoDbUserRepository as UserRepository } from "../../../src/Users/Infraestructure/Repositories/MongoDB/userRepository";

describe("LoginUseCase", () => {
    test("should login user", async () => {

        const userRepository : IUserRepository = new UserRepository();            
        const loginUseCase = new LoginUseCase(userRepository);

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

        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("email");
        expect(result).toHaveProperty("avatar");
        expect(result).toHaveProperty("token");
        expect(userRepository.findByUsername).toHaveBeenCalledWith("username");
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