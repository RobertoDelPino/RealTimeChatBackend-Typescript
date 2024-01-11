import { User } from "../Domain/entities/User";
import { UserProfile } from "../Domain/entities/UserProfile";
import { IUserRepository } from "../Domain/interfaces/userRepository";

export interface IGetProfileUseCase {
    execute(userEmail: string): Promise<UserProfile>;
}

export class GetProfileUseCase {
    constructor(private userRepository: IUserRepository) {
    }
    async execute(userEmail: string): Promise<UserProfile> {
        const user: User | null = await this.userRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error('User not found');
        }
        return new UserProfile(user.name.value, user.email.value, user.avatar.value);
    }
}