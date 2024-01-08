import { User } from "../Domain/entities/User";
import { IUserRepository } from "../Domain/interfaces/userRepository";

export interface IConfirmUserUseCase {
    execute(confirmAccountToken: string): Promise<void>;
}

export class ConfirmUserUseCase implements IConfirmUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(confirmAccountToken: string): Promise<void> {
        try{
            const user : User | null = await this.userRepository.findByConfirmAccountToken(confirmAccountToken);

            if (!user) throw new Error('User not found');
            if (user.confirmed) throw new Error('User is already confirmed');

            user.confirm();
            const userUpdated = user.update(user);

            await this.userRepository.update(userUpdated);
        } catch(error: any) {
            throw new Error(error);
        }
    }
}
