import { Chat } from "../../Application/getChatsUseCase";

export interface IChatsRepository {
    findAll(userId: string): Promise<Chat[]>;
    findBy(chatId: string): Promise<Chat>;
    save(chat: Chat): Promise<void>;
}