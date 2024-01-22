import { chatsRepositoryMock } from "../Domain/Mocks/chatRepositoryMock";

describe("get chats use Case", () => {
    let chatsRepository : IChatsRepository; 
    let getChatsUseCase : IGetChatsUseCase;

    beforeEach(() => {
        chatsRepository = chatsRepositoryMock;
        getChatsUseCase = new GetChatsUseCase(chatsRepository);
    })

    it("gets chats", async () => {
        const userId = "1";
        const chats = [createChat(userId)];
        chatsRepository.findAll = jest.fn().mockReturnValue(chats);

        await getChatsUseCase.execute(userId);

        expect(chatsRepository.findAll).toBeCalled();
        expect(chatsRepository.findAll).toReturnWith(chats);
    });
})

function createChat(userId: string): Chat {
    const user = new User(userId, "name", "email");
    const message = new Message("1", "content", user, user);
    return new Chat("1", [user], [message]);
}

export class GetChatsUseCase implements IGetChatsUseCase {
    constructor(private chatsRepository: IChatsRepository) {}

    async execute(userId: string): Promise<Chat[]> {
        return this.chatsRepository.findAll(userId);
    }
}

export interface IChatsRepository {
    findAll(userId: string): Promise<Chat[]>;
}

export interface IGetChatsUseCase {
    execute(userId: string): Promise<Chat[]>;
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