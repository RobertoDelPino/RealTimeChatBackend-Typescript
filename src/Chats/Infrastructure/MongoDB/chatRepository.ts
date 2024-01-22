import { IChatsRepository } from "../../Domain/interfaces/chatsRepository";
import { Chat } from "../../Domain/temporalObjects/Chat";
import { Message } from "../../Domain/temporalObjects/Message";
import { User } from "../../Domain/temporalObjects/User";

export class mongoDbChatRepository implements IChatsRepository{
    findAll(userId: string): Promise<Chat[]> {
        throw new Error("Method not implemented.");
    }

    findBy(chatId: string): Promise<Chat> {
        throw new Error("Method not implemented.");
    }

    save(users: User[], messages: Message[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
