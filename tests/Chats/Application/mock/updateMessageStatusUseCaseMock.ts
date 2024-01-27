import { IUpdateMessageStatusUseCase } from "../../../../src/Chats/Application/updateMessageStatusUseCase";

let updateMessageStatusUseCaseMock : IUpdateMessageStatusUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { updateMessageStatusUseCaseMock };