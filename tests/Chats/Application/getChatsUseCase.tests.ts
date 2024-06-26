import { IGetChatsUseCase, GetChatsUseCase } from "../../../src/Chats/Application/getChatsUseCase";
import { IChatsRepository } from "../../../src/Chats/Domain/interfaces/chatsRepository";
import { Chat } from "../../../src/Chats/Domain/Entities/Chat";
import { Message } from "../../../src/Chats/Domain/Entities/Message";
import { User } from "../../../src/Chats/Domain/Entities/User";
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

    it("throws an error if repository fails", async () => {
        const userId = "1";
        chatsRepository.findAll = jest.fn().mockRejectedValue(new Error('User not found'));

        await expect(getChatsUseCase.execute(userId)).rejects.toThrowError('User not found');
    });

    it("throws an error if userId is empty", async () => {
        const userId = "";

        await expect(getChatsUseCase.execute(userId)).rejects.toThrowError('UserId is required');
    });
})

function createChat(userId: string): Chat {
    const user = new User(userId, "name", "email");
    const message = new Message("1", "content", user, new Date(), false);
    return new Chat("1", [user], [message], false, "", new Date());
}