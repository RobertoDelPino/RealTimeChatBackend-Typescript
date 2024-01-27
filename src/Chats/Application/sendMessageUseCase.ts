import { Message } from "../Domain/Entities/Message";
import { IChatsRepository } from "../Domain/interfaces/chatsRepository";

export interface ISendMessageUseCase {
    execute(chatId: string, message: Message): Promise<Message>;
}

export class SendMessageUseCase implements ISendMessageUseCase {

    constructor(
        private chatRepository: IChatsRepository
    ) {}

    async execute(chatId: string, message: Message): Promise<Message> {
        if(!await this.chatRepository.exists(chatId)) {
            throw new Error("Chat does not exists");
        }

        return await this.chatRepository.sendMessage(chatId, message);
    }

}