import { CreateChatUseCase, ICreateChatUseCase } from "../../../src/Chats/Application/createChatUseCase";
import { IChatsRepository } from "../../../src/Chats/Domain/interfaces/chatsRepository";
import { Chat } from "../../../src/Chats/Domain/temporalObjects/Chat";
import { chatsRepositoryMock } from "../Domain/Mocks/chatRepositoryMock"

describe('createChatUseCase', () => {

    let createChatUseCase: ICreateChatUseCase;
    let chatRepository: IChatsRepository;

    beforeEach(() => {
        chatRepository = chatsRepositoryMock;
        createChatUseCase = new CreateChatUseCase(chatRepository);
    });

    it('creates a chat', async () => {
        const chat = new Chat('1', [], []);

        await createChatUseCase.execute(chat);
    
        expect(chatRepository.save).toBeCalledWith(chat);
    });
});

