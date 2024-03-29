import { IChatsRepository } from "../Domain/interfaces/chatsRepository";
import { Chat } from "../Domain/Entities/Chat";
import { User } from "../Domain/Entities/User";

export interface ICreateChatUseCase {
    execute(users: string[], chatName: string): Promise<Chat>;
}

export class CreateChatUseCase implements ICreateChatUseCase {
    constructor(private chatsRepository: IChatsRepository) {}

    async execute(users: string[], chatName: string = ""): Promise<Chat> {
        if(users.length < 2) { throw new Error("A chat must have at least 2 users"); }
        if(users.length > 2 && chatName == "") { throw new Error("A group chat must have a name"); }

        const isGroup: boolean = users.length > 2;
        const newUsers: User[] = users.map(userId => new User(userId, "", ""));
        const chat = new Chat("", newUsers, [], isGroup, chatName || "", new Date());

        return this.chatsRepository.save(chat);
    }
}

