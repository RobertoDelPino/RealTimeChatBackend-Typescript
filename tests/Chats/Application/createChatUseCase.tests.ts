import { CreateChatUseCase, ICreateChatUseCase } from "../../../src/Chats/Application/createChatUseCase";
import { IChatsRepository } from "../../../src/Chats/Domain/interfaces/chatsRepository";
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
        chatRepository.findChatByUsers = jest.fn().mockReturnValue(false);

        await createChatUseCase.execute(users, "");
    
        expect(chatRepository.save).toBeCalled();
    });

    it('throws an error when creating a chat with less than 2 users', async () => {
        const users: string[] = ["12345678"];

        await expect(createChatUseCase.execute(users, "")).rejects.toThrow("A chat must have at least 2 users");
    });

    it('throws an error when creating a group chat without a name', async () => {
        const users: string[] = ["12345678", "87654321", "12348765"];

        await expect(createChatUseCase.execute(users, "")).rejects.toThrow("A group chat must have a name");
    });

    it('creates a group chat', async () => {
        const users: string[] = ["12345678", "87654321", "12348765"];

        await createChatUseCase.execute(users, "Group Chat");
    
        expect(chatRepository.save).toBeCalled();
    });

    it('throws an error when creating a chat that already exists', async () => {
        const users: string[] = ["12345678", "87654321"];
        chatRepository.findChatByUsers = jest.fn().mockReturnValue(true);

        await expect(createChatUseCase.execute(users, "")).rejects.toThrow("Chat already exist");
    });
});

