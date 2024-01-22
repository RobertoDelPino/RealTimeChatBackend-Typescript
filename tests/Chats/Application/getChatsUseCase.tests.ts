import { Chat, Message, User, IGetChatsUseCase, GetChatsUseCase } from "../../../src/Chats/Application/getChatsUseCase";
import { IChatsRepository } from "../../../src/Chats/Domain/interfaces/chatsRepository";
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