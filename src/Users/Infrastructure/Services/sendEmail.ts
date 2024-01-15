import { IEmailSender } from "../../Domain/interfaces/emailSender";
import { Token } from "../../Domain/valueObjects/Token";
import { UserEmail } from "../../Domain/valueObjects/UserEmail";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

export class sendEmail implements IEmailSender {

    private transport: nodemailer.Transporter;

    constructor() {
        dotenv.config();
        this.transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendEmailToConfirmAccount(email: UserEmail, confirmAccountToken: Token): Promise<void> {
        await this.transport.sendMail({
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

    sendForgotPasswordEmail(email: UserEmail, changePasswordToken: Token): void {
        this.transport.sendMail({
            from: '"Chat App - Real Time Chat App" <cuentas@realchat.com>',
            to: email.value,
            subject: "Real Time Chat App - Change your password",
            text: "Forgot password",
            html: `<p>Hola, Cambia tu contraseña</p>
            <p>Parece que te has olvidado de tu contraseña. Cambiala en el siguiente enlace:</p>

            <a href="${process.env.FRONTEND_URL}/forgot-password/${changePasswordToken.value}">Comprobar cuenta</a>

            <p>If you didnt send this petition, you should change your password</p>
            `
        })
    }
}