import { User } from "../Domain/entities/User";
import { ICreateToken } from "../Domain/interfaces/createToken";
import { IEmailSender } from "../Domain/interfaces/emailSender";
import { IUserRepository } from "../Domain/interfaces/userRepository";
import { Token } from "../Domain/valueObjects/Token";

export interface IForgotPasswordUseCase {
    execute(email: string): Promise<void>;
}

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
    constructor(
        private userRepository: IUserRepository,
        private emailSender: IEmailSender,
        private createToken: ICreateToken
    ) {}

    async execute(email: string): Promise<void> {
        const user : User | null = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        const changePasswordToken : Token = this.createToken.createToken();
        const userWithNewPasswordChangeToken : User = this.createUserWithNewPasswordChangeToken(user, changePasswordToken);
        await this.userRepository.update(userWithNewPasswordChangeToken);
        this.emailSender.sendForgotPasswordEmail(user.email, changePasswordToken);
    }

    private createUserWithNewPasswordChangeToken(user: User, token : Token): User {
        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.confirmAccountToken,
            token,
            user.confirmed,
            user.avatar
        );
    }
}
