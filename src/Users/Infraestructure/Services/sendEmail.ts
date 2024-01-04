import { IEmailSender } from "../../Domain/interfaces/emailSender";
import { Token } from "../../Domain/valueObjects/Token";
import { UserEmail } from "../../Domain/valueObjects/UserEmail";
import nodemailer from "nodemailer"

export class sendEmail implements IEmailSender {
    async sendEmailToConfirmAccount(email: UserEmail, confirmAccountToken: Token): Promise<void> {
        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
        });
    
        await transport.sendMail({
            from: '"Chat App - Real Time Chat App"',
            to: email.value,
            subject: "Real Time Chat App - Confirm your account",
            text: "Check your account",
            html: `<p>Hello, check your account</p>
            <p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:</p>
    
            <a href="${process.env.FRONTEND_URL}/confirm/${confirmAccountToken.value}">Comprobar cuenta</a>
    
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
            `
        })
    }
}