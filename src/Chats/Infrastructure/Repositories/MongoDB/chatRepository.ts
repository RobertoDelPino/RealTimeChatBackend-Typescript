import { IChatsRepository } from "../../../Domain/interfaces/chatsRepository";
import { Chat } from "../../../Domain/temporalObjects/Chat";
import { Message } from "../../../Domain/temporalObjects/Message";
import { User } from "../../../Domain/temporalObjects/User";
import MongoDbChat, { IChat } from "./Models/Chat";

export class mongoDbChatRepository implements IChatsRepository{
    async findAll(userId: string): Promise<Chat[]> {
        const chats = await MongoDbChat.find({users: userId})
                            .select({messages: { $slice: -1 }})
                            .select("-createdAt -updatedAt -__v")
                            .populate({path: "users", select: "-password -confirmed -createdAt -updatedAt -token -__v -confirmAccountToken -changePasswordToken"})
                            .populate({path: "messages", select: "_id readed message sender"})
        
        return chats.map(createChat);

        function createChat(chat){
            return new Chat(
                chat._id,
                chat.users.map(user => new User(
                    user._id,
                    user.name,
                    user.email
                )),
                chat.messages.map(message => new Message(
                    message._id,
                    message.message,
                    message.sender,
                    message.readed
                ))
            );
        }
    }

    async findBy(chatId: string): Promise<Chat> {
        console.log("hola")
        const chat = await MongoDbChat.findById(chatId)
                            .select({messages: { $slice: -100 }})
                            .select("-__v -createdAt -updatedAt")
                            .populate({path: "users", select: "_id name email"})
                            .populate({path: "messages", select: "_id readed message sender createdAt"})
        
        return createChat(chat);

        function createChat(chat: any){
            return new Chat(
                chat._id,
                chat.users.map(user => new User(
                    user._id,
                    user.name,
                    user.email
                )),
                chat.messages.map(message => new Message(
                    message._id,
                    message.message,
                    message.sender,
                    message.readed
                ))
            );
        }
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
