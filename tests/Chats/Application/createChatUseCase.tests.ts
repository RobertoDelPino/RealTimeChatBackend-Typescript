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
        const users: string[] = ["12345678", "87654321"];

        await createChatUseCase.execute(users);
    
        expect(chatRepository.save).toBeCalled();
    });

    it('throws an error when creating a chat with less than 2 users', async () => {
        const users: string[] = ["12345678"];

        await expect(createChatUseCase.execute(users)).rejects.toThrow("A chat must have at least 2 users");
    });

    
});

