import { IGetChatUseCase } from "../../../../src/Chats/Application/getChatUseCase";

let getChatUseCaseMock : IGetChatUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { getChatUseCaseMock };