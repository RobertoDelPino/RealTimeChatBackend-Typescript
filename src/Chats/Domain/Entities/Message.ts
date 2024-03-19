import { User } from "./User";

export class Message {
    constructor(
        public _id?: string,
        public message?: string,
        public sender?: User,
        public createdAt?: Date,
        public readed: boolean = false,
    ) {}
}