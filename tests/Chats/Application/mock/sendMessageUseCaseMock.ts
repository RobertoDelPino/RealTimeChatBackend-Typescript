import { ISendMessageUseCase } from "../../../../src/Chats/Application/sendMessageUseCase";

let sendMessageUseCaseMock : ISendMessageUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { sendMessageUseCaseMock };