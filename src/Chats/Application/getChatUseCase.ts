import { IChatsRepository } from "../Domain/interfaces/chatsRepository";
import { Chat } from "../Domain/Entities/Chat";

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

