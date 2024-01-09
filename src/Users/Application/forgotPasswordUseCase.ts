import { User } from "../Domain/entities/User";
import { ICreateToken } from "../Domain/interfaces/createToken";
import { IEmailSender } from "../Domain/interfaces/emailSender";
import { IUserRepository } from "../Domain/interfaces/userRepository";
import { Token } from "../Domain/valueObjects/Token";

export class ForgotPasswordUseCase {
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
        user.changePasswordToken = token;
        return new User(
            user.id,
            user.email,
            user.name,
            user.password,
            user.changePasswordToken,
            user.confirmAccountToken,
            user.confirmed,
            user.avatar
        );
    }
}
