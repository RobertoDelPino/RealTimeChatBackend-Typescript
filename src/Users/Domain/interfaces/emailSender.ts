import { Token } from "../valueObjects/Token";
import { UserEmail } from "../valueObjects/UserEmail";

export interface IEmailSender {
    sendForgotPasswordEmail(email: UserEmail, newPassword: Token): void;
    sendEmailToConfirmAccount(email: UserEmail, confirmAccountToken: Token): void;
}


