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

        expect(result).toEqual("message status updated");
    });
});

export interface IUpdateMessageStatusUseCase {
    execute(chatId: string, userId: string): Promise<string>;
}

export class UpdateMessageStatusUseCase implements IUpdateMessageStatusUseCase {

    constructor(
        private chatRepository: IChatsRepository
    ) {}

    async execute(chatId: string, userId: string): Promise<string> {
        if(!await this.chatRepository.exists(chatId)) {
            throw new Error("Chat does not exists");
        }

        return "message status updated" ;
    }

}