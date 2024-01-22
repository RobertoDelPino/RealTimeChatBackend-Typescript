import { IChatsRepository } from "../Domain/interfaces/chatsRepository";

export interface IGetChatUseCase {
    execute(chatId: string): Promise<Chat>;
}

export class GetChatUseCase implements IGetChatUseCase {
    constructor(private chatsRepository: IChatsRepository) {}

    async execute(chatId: string): Promise<Chat> {
        if (chatId === "") {
            throw new Error("ChatId is required");
        }
        return this.chatsRepository.findBy(chatId);
    }
}

export class Chat {
    constructor(
        public _id: string,
        public users: User[],
        public messages: Message[]
    ) {}
}

export class User {
    constructor(
        public _id?: string,
        public name?: string,
        public email?: string
    ) {}
}

export class Message {
    constructor(
        public _id?: string,
        public content?: string,
        public sender?: User,
        public receiver?: User
    ) {}
}