import { ICreateToken } from "../Domain/interfaces/createToken";
import { IUserRepository } from "../Domain/interfaces/userRepository";

export interface IConfirmUserUseCase {
    execute(confirmAccountToken: string): Promise<void>;
}

export class ConfirmUserUseCase implements IConfirmUserUseCase {
    constructor(private userRepository: IUserRepository, private createToken: ICreateToken) {}

    async execute(confirmAccountToken: string): Promise<void> {
        try{
            const user = await this.userRepository.findByConfirmAccountToken(confirmAccountToken);

            if (!user) throw new Error('User not found');
            if (user.confirmed) throw new Error('User is already confirmed');

            user.confirmed = true;
            user.confirmAccountToken = this.createToken.createEmptyToken();
            user.update(user);

            await this.userRepository.save(user);
        } catch(error: any) {
            throw new Error(error);
        }
    }
}
