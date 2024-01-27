import { IChatsRepository } from "../Domain/interfaces/chatsRepository";
import { Chat } from "../Domain/Entities/Chat";
import { User } from "../Domain/Entities/User";

export interface ICreateChatUseCase {
    execute(users: User[]): Promise<Chat>;
}

export class CreateChatUseCase implements ICreateChatUseCase {
    constructor(private chatsRepository: IChatsRepository) {}

    async execute(users: User[]): Promise<Chat> {
        return this.chatsRepository.save(users);
    }
}

