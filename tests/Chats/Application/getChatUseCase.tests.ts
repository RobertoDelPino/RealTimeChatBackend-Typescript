import { GetChatUseCase, IGetChatUseCase } from "../../../src/Chats/Application/getChatUseCase";
import { IChatsRepository } from "../../../src/Chats/Domain/interfaces/chatsRepository";
import { Chat } from "../../../src/Chats/Domain/Entities/Chat";
import { Message } from "../../../src/Chats/Domain/Entities/Message";
import { User } from "../../../src/Chats/Domain/Entities/User";
import { chatsRepositoryMock } from "../Domain/Mocks/chatRepositoryMock";

describe('getChatUseCase', () => {

    let chatsRepository : IChatsRepository; 
    let getChatUseCase : IGetChatUseCase;

    beforeEach(() => {
        chatsRepository = chatsRepositoryMock;
        getChatUseCase = new GetChatUseCase(chatsRepository);
    })

    it('gets chat', async () => {
        const chatId = '1';
        const chat = createChat(chatId);
        chatsRepository.findBy = jest.fn().mockReturnValue(chat);

        const result = await getChatUseCase.execute(chatId);

        expect(chatsRepository.findBy).toBeCalled();
        expect(result).toBe(chat);
    });

    it('throws an error if chat is not found', async () => {
        const chatId = '1';
        chatsRepository.findBy = jest.fn().mockRejectedValue(new Error('Chat not found'));

        await expect(getChatUseCase.execute(chatId)).rejects.toThrowError('Chat not found');
    });

    it('throws an error if chatId is empty', async () => {
        const chatId = '';

        await expect(getChatUseCase.execute(chatId)).rejects.toThrowError('ChatId is required');
    });
});

function createChat(chatId: string): Chat {
    const user1 = new User("1", "name", "email");
    const user2 = new User("2", "name", "email");
    const message = new Message("1", "content", user1, new Date(), false);
    return new Chat(chatId, [user1, user2], [message], false, "");
}