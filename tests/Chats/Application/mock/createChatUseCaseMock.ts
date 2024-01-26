import { ICreateChatUseCase } from "../../../../src/Chats/Application/createChatUseCase";

let createChatUseCaseMock : ICreateChatUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { createChatUseCaseMock };