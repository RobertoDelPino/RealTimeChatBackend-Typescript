import { id } from "fp-ts/lib/Refinement";
import { IChatsRepository } from "../../../Domain/interfaces/chatsRepository";
import { Chat } from "../../../Domain/temporalObjects/Chat";
import { Message } from "../../../Domain/temporalObjects/Message";
import { User } from "../../../Domain/temporalObjects/User";
import MongoDbChat, { IChat } from "./Models/Chat";

export class mongoDbChatRepository implements IChatsRepository{
    findAll(userId: string): Promise<Chat[]> {
        throw new Error("Method not implemented.");
    }

    findBy(chatId: string): Promise<Chat> {
        throw new Error("Method not implemented.");
    }

    async save(users: User[]): Promise<Chat> {
        const chat = new MongoDbChat({users: users});
        
        await chat.save();
        
        return createChat(chat);

        function createChat(chat: IChat){
            return new Chat(
                chat._id,
                users = chat.users.map(id => new User(
                    id,
                    "",
                    "",
                )),
                []
            );
        }
    }
}
