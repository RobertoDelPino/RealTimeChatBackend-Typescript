import { IChatsRepository } from "../Domain/interfaces/chatsRepository";
import { Chat } from "./getChatsUseCase";

export interface ICreateChatUseCase {
    execute(chat: Chat): Promise<void>;
}

export class CreateChatUseCase implements ICreateChatUseCase {
    constructor(private chatsRepository: IChatsRepository) {}

    async execute(chat: Chat): Promise<void> {
        return this.chatsRepository.save(chat);
    }
}

