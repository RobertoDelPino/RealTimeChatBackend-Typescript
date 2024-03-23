import { Message } from "./Message";
import { User } from "./User";

export class Chat {
    constructor(
        public _id: string,
        public users: User[],
        public messages: Message[],
        public isGroup: boolean,
        public groupName: string
    ) {}
}