import { Token } from "../valueObjects/Token";
import { UserEmail } from "../valueObjects/UserEmail";

export interface IEmailSender {
    sendEmailToConfirmAccount(email: UserEmail, confirmAccountToken: Token): void;
}


