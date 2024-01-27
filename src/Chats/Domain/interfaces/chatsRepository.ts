import { Chat } from "../temporalObjects/Chat";
import { User } from "../temporalObjects/User";

export interface IChatsRepository {
    findAll(userId: string): Promise<Chat[]>;
    findBy(chatId: string): Promise<Chat>;
    save(users: User[]): Promise<Chat>;
}