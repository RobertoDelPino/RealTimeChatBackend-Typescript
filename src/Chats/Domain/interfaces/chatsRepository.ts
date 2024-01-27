import { Chat } from "../Entities/Chat";
import { Message } from "../Entities/Message";
import { User } from "../Entities/User";

export interface IChatsRepository {
    findAll(userId: string): Promise<Chat[]>;
    findBy(chatId: string): Promise<Chat>;
    save(users: User[]): Promise<Chat>;
    sendMessage(chatId: string, message: Message): Promise<Message>;
    exists(chatId: string): Promise<boolean>;
    updateMessageStatus(chatId: string, userId: string): Promise<void>;
}