import { User } from "../Domain/entities/User";
import { IUserRepository } from "../Domain/interfaces/userRepository";

export interface IGetProfileUseCase {
    execute(userEmail: string): Promise<any>;
}

export class GetProfileUseCase {
    constructor(private userRepository: IUserRepository) {
    }
    async execute(userEmail: string): Promise<User> {
        const user: User | null = await this.userRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}