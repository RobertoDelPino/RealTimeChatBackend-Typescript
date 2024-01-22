import { IChatsRepository } from "../../../../src/Chats/Domain/interfaces/chatsRepository";

let chatsRepositoryMock : IChatsRepository = {
    findAll: jest.fn().mockReturnValue(true),
    findBy: jest.fn().mockReturnValue(true),
};

export { chatsRepositoryMock };