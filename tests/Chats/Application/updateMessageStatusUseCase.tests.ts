import { IChatsRepository } from "../../../src/Chats/Domain/interfaces/chatsRepository";
import { chatsRepositoryMock } from "../Domain/Mocks/chatRepositoryMock";

describe("updateMessageStatusUseCase", () => {

    let updateMessageStatusUseCase: IUpdateMessageStatusUseCase;
    let chatRepository: IChatsRepository;

    beforeEach(() => {
        chatRepository = chatsRepositoryMock;
        updateMessageStatusUseCase = new UpdateMessageStatusUseCase(chatRepository);
    });

    it("updates a message status", async () => {
        const chatId = "chatId";
        const userId = "userId";
        chatRepository.exists = jest.fn().mockReturnValue(true);

        const result = await updateMessageStatusUseCase.execute(chatId, userId);

        expect(result.message).toEqual("message status updated");
    });
});