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