import { Chat } from "../../Application/getChatsUseCase";

export interface IChatsRepository {
    findAll(userId: string): Promise<Chat[]>;
}