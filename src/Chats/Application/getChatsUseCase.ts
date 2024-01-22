import { IChatsRepository } from "../Domain/interfaces/chatsRepository";


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