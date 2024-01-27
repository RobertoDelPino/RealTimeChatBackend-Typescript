import { IChatsRepository } from "../../../../src/Chats/Domain/interfaces/chatsRepository";

let chatsRepositoryMock : IChatsRepository = {
    findAll: jest.fn().mockReturnValue(true),
    findBy: jest.fn().mockReturnValue(true),
    save: jest.fn().mockReturnValue(true),
    exists: jest.fn().mockReturnValue(true),
    sendMessage: jest.fn().mockReturnValue(true)
};

export { chatsRepositoryMock };