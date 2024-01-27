import { IChatsRepository } from "../Domain/interfaces/chatsRepository";
import { Chat } from "../Domain/Entities/Chat";

export interface IGetChatsUseCase {
    execute(userId: string): Promise<Chat[]>;
}

export class GetChatsUseCase implements IGetChatsUseCase {
    constructor(private chatsRepository: IChatsRepository) {}

    async execute(userId: string): Promise<Chat[]> {
        if (userId === "") {
            throw new Error("UserId is required");
        }
        return this.chatsRepository.findAll(userId);
    }
}