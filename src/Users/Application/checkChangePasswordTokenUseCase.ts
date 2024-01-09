import { User } from "../Domain/entities/User";
import { IUserRepository } from "../Domain/interfaces/userRepository";

export interface ICheckChangePasswordTokenUseCase {
    execute(email: string): Promise<void>;
}

export class CheckChangePasswordTokenUseCase implements ICheckChangePasswordTokenUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) {}

    async execute(changePasswordToken: string): Promise<void> {
        const user : User | null = await this.userRepository.findByChangePasswordToken(changePasswordToken);
        if (!user) {
            throw new Error('User not found');
        }
    }
}
