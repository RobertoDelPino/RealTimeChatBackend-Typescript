import { CreateChatUseCase, ICreateChatUseCase } from "../../../src/Chats/Application/createChatUseCase";
import { IChatsRepository } from "../../../src/Chats/Domain/interfaces/chatsRepository";
import { User } from "../../../src/Chats/Domain/Entities/User";
import { chatsRepositoryMock } from "../Domain/Mocks/chatRepositoryMock"

describe('createChatUseCase', () => {

    let createChatUseCase: ICreateChatUseCase;
    let chatRepository: IChatsRepository;

    beforeEach(() => {
        chatRepository = chatsRepositoryMock;
        createChatUseCase = new CreateChatUseCase(chatRepository);
    });

    it('creates a chat', async () => {
        const users : User[] = [];

        await createChatUseCase.execute(users);
    
        expect(chatRepository.save).toBeCalledWith(users);
    });
});

