import { IGetChatsUseCase } from "../../../../src/Chats/Application/getChatsUseCase";

let getChatsUseCaseMock : IGetChatsUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { getChatsUseCaseMock };