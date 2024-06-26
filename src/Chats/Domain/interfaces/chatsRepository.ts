import { Chat } from "../Entities/Chat";
import { Message } from "../Entities/Message";

export interface IChatsRepository {
    findAll(userId: string): Promise<Chat[]>;
    findBy(chatId: string): Promise<Chat>;
    save(chat: Chat): Promise<Chat>;
    sendMessage(chatId: string, message: Message): Promise<Message>;
    exists(chatId: string): Promise<boolean>;
    updateMessageStatus(chatId: string, userId: string): Promise<void>;
    findChatByUsers(users: string[]): Promise<boolean>;
}