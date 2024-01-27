import { IChatsRepository } from "../Domain/interfaces/chatsRepository";

export interface IUpdateMessageStatusUseCase {
    execute(chatId: string, userId: string): Promise<string>;
}

export class UpdateMessageStatusUseCase implements IUpdateMessageStatusUseCase {

    constructor(
        private chatRepository: IChatsRepository
    ) {}

    async execute(chatId: string, userId: string): Promise<string> {
        if(!await this.chatRepository.exists(chatId)) {
            throw new Error("Chat does not exists");
        }

        return "message status updated" ;
    }
}