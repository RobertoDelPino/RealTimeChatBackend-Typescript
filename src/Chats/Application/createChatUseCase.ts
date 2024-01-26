import { IChatsRepository } from "../Domain/interfaces/chatsRepository";
import { Chat } from "../Domain/temporalObjects/Chat";
import { Message } from "../Domain/temporalObjects/Message";
import { User } from "../Domain/temporalObjects/User";

export interface ICreateChatUseCase {
    execute(users: User[]): Promise<void>;
}

export class CreateChatUseCase implements ICreateChatUseCase {
    constructor(private chatsRepository: IChatsRepository) {}

    async execute(users: User[]): Promise<void> {
        return this.chatsRepository.save(users);
    }
}

