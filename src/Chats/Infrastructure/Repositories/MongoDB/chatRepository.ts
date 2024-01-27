import { IChatsRepository } from "../../../Domain/interfaces/chatsRepository";
import { Chat } from "../../../Domain/Entities/Chat";
import { Message } from "../../../Domain/Entities/Message";
import { User } from "../../../Domain/Entities/User";
import { IChat, Chat as MongoDbChat, Message as MongoDbMessage } from "./Models/Chat";

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
                    undefined,
                    message.readed
                ))
            );
        }
    }

    async findBy(chatId: string): Promise<Chat> {
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
                    undefined,
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
                    id.toString(),
                    "",
                    "",
                )),
                []
            );
        }
    }

    async sendMessage(chatId: string, message: Message): Promise<Message> {
        throw new Error("Method not implemented.");
    }

    async exists(chatId: string): Promise<boolean> {
        if(await MongoDbChat.exists({_id: chatId})){
            return true;
        }
        return false;
    }

    async updateMessageStatus(chatId: string, userId: string): Promise<void> {
        const chat = await MongoDbChat.findById(chatId)
                    .select("messages");

        if(!chat){
            throw new Error("Chat does not exists");
        }

        await MongoDbMessage.updateMany({_id: {$in: chat.messages}, sender: userId}, {readed: true})
    }
}
