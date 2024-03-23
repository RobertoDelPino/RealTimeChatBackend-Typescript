import { ICreateGroupChatUseCase } from "../../Infrastructure/createGroupChatController.tests";

let createGroupChatUseCaseMock : ICreateGroupChatUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { createGroupChatUseCaseMock };