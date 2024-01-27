import { Chat } from "../Entities/Chat";
import { User } from "../Entities/User";

export interface IChatsRepository {
    findAll(userId: string): Promise<Chat[]>;
    findBy(chatId: string): Promise<Chat>;
    save(users: User[]): Promise<Chat>;
}