import { IChatsRepository } from "../../../src/Chats/Domain/interfaces/chatsRepository";
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
});

function createChat(chatId: string): Chat {
    const user1 = new User("1", "name", "email");
    const user2 = new User("2", "name", "email");
    const message = new Message("1", "content", user1, user2);
    return new Chat(chatId, [user1, user2], [message]);
}
export interface IGetChatUseCase {
    execute(chatId: string): Promise<Chat>;
}

export class GetChatUseCase implements IGetChatUseCase {
    constructor(private chatsRepository: IChatsRepository) {}

    async execute(chatId: string): Promise<Chat> {
        if (chatId === "") {
            throw new Error("ChatId is required");
        }
        return this.chatsRepository.findBy(chatId);
    }

}

export class Chat {
    constructor(
        public _id: string,
        public users: User[],
        public messages: Message[]
    ) {}
}

export class User {
    constructor(
        public _id?: string,
        public name?: string,
        public email?: string
    ) {}
}

export class Message {
    constructor(
        public _id?: string,
        public content?: string,
        public sender?: User,
        public receiver?: User
    ) {}
}