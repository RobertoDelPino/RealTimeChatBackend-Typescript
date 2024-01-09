import { User } from "../Domain/entities/User";
import { IUserRepository } from "../Domain/interfaces/userRepository";

export interface ICheckChangePasswordTokenUseCase {
    execute(email: string, userEmail: string): Promise<void>;
}

export class CheckChangePasswordTokenUseCase implements ICheckChangePasswordTokenUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) {}

    async execute(changePasswordToken: string, userEmail: string): Promise<void> {
        const user : User | null = await this.userRepository.findByChangePasswordToken(changePasswordToken, userEmail);
        if (!user) {
            throw new Error('User not found');
        }
    }
}
