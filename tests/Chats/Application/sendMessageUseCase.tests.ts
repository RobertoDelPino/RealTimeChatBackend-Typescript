import { Message } from "../../../src/Chats/Domain/Entities/Message";
import { User } from "../../../src/Chats/Domain/Entities/User";
import { IChatsRepository } from "../../../src/Chats/Domain/interfaces/chatsRepository";
import { chatsRepositoryMock } from "../Domain/Mocks/chatRepositoryMock";

describe('sendMessageUseCase', () => {

    let sendMessageUseCase: ISendMessageUseCase;
    let chatRepository: IChatsRepository;

    beforeEach(() => {
        chatRepository = chatsRepositoryMock;
        sendMessageUseCase = new SendMessageUseCase(chatRepository);
    });

    it("creates a message", async () => {
        const message = new Message(
            "messageId",
            "content of the message",
            new User("userId", "userName", "userEmail"),
            new Date(),
            false
        );
        const chatId = "chatId";
        chatRepository.exists = jest.fn().mockReturnValue(true);
        chatRepository.sendMessage = jest.fn().mockReturnValue(message);

        const result = await sendMessageUseCase.execute(chatId, message);

        expect(result).toEqual(message);
    });

    it("throws an error if chat does not exists", async () => {
        const message = new Message(
            "messageId",
            "content of the message",
            new User("userId", "userName", "userEmail"),
            new Date(),
            false
        );
        const chatId = "chatId";
        chatRepository.exists = jest.fn().mockReturnValue(false);

        await expect(sendMessageUseCase.execute(chatId, message)).rejects.toThrow("Chat does not exists");
    });
});


export interface ISendMessageUseCase {
    execute(chatId: string, message: Message): Promise<Message>;
}

export class SendMessageUseCase implements ISendMessageUseCase {

    constructor(
        private chatRepository: IChatsRepository
    ) {}

    async execute(chatId: string, message: Message): Promise<Message> {
        if(!await this.chatRepository.exists(chatId)) {
            throw new Error("Chat does not exists");
        }

        return await this.chatRepository.sendMessage(chatId, message);
    }

}