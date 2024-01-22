import { CreateChatUseCase, ICreateChatUseCase } from "../../../src/Chats/Application/createChatUseCase";
import { IChatsRepository } from "../../../src/Chats/Domain/interfaces/chatsRepository";
import { Message } from "../../../src/Chats/Domain/temporalObjects/Message";
import { User } from "../../../src/Chats/Domain/temporalObjects/User";
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
        const messages : Message[] = [];

        await createChatUseCase.execute(users, messages);
    
        expect(chatRepository.save).toBeCalledWith(messages, users);
    });
});

