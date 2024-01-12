import { IEmailSender } from "../../../../src/Users/Domain/interfaces/emailSender";

let emailSenderMock : IEmailSender = {
    sendForgotPasswordEmail: jest.fn(),
    sendEmailToConfirmAccount: jest.fn()
};

export { emailSenderMock };