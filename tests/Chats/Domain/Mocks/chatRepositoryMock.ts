import { IChatsRepository } from "../../Application/getChatsUseCase.tests";

let chatsRepositoryMock : IChatsRepository = {
    findAll: jest.fn().mockReturnValue(true)
};

export { chatsRepositoryMock };