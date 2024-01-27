import { User } from "./User";

export class Message {
    constructor(
        public _id?: string,
        public content?: string,
        public sender?: User,
        public receiver?: User
    ) {}
}