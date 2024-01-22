import { Chat } from "../../../src/Chats/Application/getChatsUseCase";
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
        const chat = new Chat('1', [], []);

        await createChatUseCase.execute(chat);
    
        expect(chatRepository.save).toBeCalledWith(chat);
    });
});

export interface ICreateChatUseCase {
    execute(chat: Chat): Promise<void>;
}

export class CreateChatUseCase implements ICreateChatUseCase {
    constructor(private chatsRepository: IChatsRepository) {}

    async execute(chat: Chat): Promise<void> {
        return this.chatsRepository.save(chat);
    }
}

